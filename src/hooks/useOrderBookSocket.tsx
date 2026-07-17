import { useEffect, useRef, useState } from "react";
import type { OrderBook } from "@/types/orderbook";

type ConnectionState = "connecting" | "open" | "reconnecting";

const WS_URL = "wss://socket.bayse.markets/ws/v1/markets";
const MAX_BACKOFF_MS = 30000;
const BASE_BACKOFF_MS = 1000;
const APP_PING_INTERVAL_MS = 20000;

export function useOrderBookSocket(marketId: string, currency: string) {
  const [booksByOutcome, setBooksByOutcome] = useState<Record<string, OrderBook>>({});
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting");

  const wsRef = useRef<WebSocket | null>(null);
  const attemptRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const pingTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const roomRef = useRef<string>("");

  useEffect(() => {
    if (!marketId) return;
    let cancelled = false;

    const room =
      currency === "NGN" ? `orderbook:${marketId}:NGN` : `orderbook:${marketId}`;
    roomRef.current = room;

    const connect = () => {
      if (cancelled) return;
      setConnectionState(attemptRef.current === 0 ? "connecting" : "reconnecting");

      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.addEventListener("open", () => {
        attemptRef.current = 0;
        setConnectionState("open");

        // On (re)connect, drop anything we had — the next snapshot is truth.
        setBooksByOutcome({});

        ws.send(
          JSON.stringify({
            type: "subscribe",
            channel: "orderbook",
            marketIds: [marketId],
            currency,
          }),
        );

        pingTimerRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping" }));
          }
        }, APP_PING_INTERVAL_MS);
      });

      ws.addEventListener("message", (event) => {
        for (const line of event.data.split("\n")) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            if (msg.type === "orderbook_update") {
              const ob = msg.data.orderbook as OrderBook & { outcomeId: string };
              setBooksByOutcome((prev) => ({ ...prev, [ob.outcomeId]: ob }));
            }
            // "connected", "pong" acknowledged implicitly — nothing to do
          } catch {
            // Malformed line — skip it, don't crash the stream.
          }
        }
      });

      ws.addEventListener("close", () => {
        if (cancelled) return;
        clearInterval(pingTimerRef.current);
        setConnectionState("reconnecting");
        setBooksByOutcome({}); // don't show possibly-stale data as live

        const delay = Math.min(
          BASE_BACKOFF_MS * 2 ** attemptRef.current,
          MAX_BACKOFF_MS,
        );
        attemptRef.current += 1;
        reconnectTimerRef.current = setTimeout(connect, delay);
      });

      ws.addEventListener("error", () => ws.close());
    };

    connect();

    return () => {
      cancelled = true;
      clearTimeout(reconnectTimerRef.current);
      clearInterval(pingTimerRef.current);
      const ws = wsRef.current;
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "unsubscribe", room: roomRef.current }));
      }
      ws?.close();
    };
  }, [marketId, currency]);

  return { booksByOutcome, connectionState };
}