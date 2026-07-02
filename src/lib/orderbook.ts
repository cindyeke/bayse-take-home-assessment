// lib/orderbook.ts
import type { OrderBookLevel, DepthLevel } from "@/types/orderbook";

export interface DerivedOrderBook {
  bidDepth: DepthLevel[];
  askDepth: DepthLevel[];
  bestBid: number | null;
  bestAsk: number | null;
  spread: number | null;
  midpoint: number | null;
}

export function deriveOrderBook(
  bids: OrderBookLevel[],
  asks: OrderBookLevel[],
): DerivedOrderBook {
  const allTotals = [...bids, ...asks].map((l) => l.total);
  const maxCumulative = allTotals.length > 0 ? Math.max(...allTotals) : 0;

  const withDepth = (levels: OrderBookLevel[]): DepthLevel[] =>
    levels.map((level) => ({
      ...level,
      depthPercent: maxCumulative > 0 ? (level.total / maxCumulative) * 100 : 0,
    }));

  const bestBid = bids[0]?.price ?? null;
  const bestAsk = asks[0]?.price ?? null;
  const spread =
    bestBid !== null && bestAsk !== null ? bestAsk - bestBid : null;
  const midpoint =
    bestBid !== null && bestAsk !== null ? (bestBid + bestAsk) / 2 : null;

  return {
    bidDepth: withDepth(bids),
    askDepth: withDepth(asks),
    bestBid,
    bestAsk,
    spread,
    midpoint,
  };
}
