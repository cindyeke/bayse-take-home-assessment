// hooks/useOrderBook.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiclient";
import { queryKeys } from "@/lib/querykeys";
import { OrderBook } from "@/types/orderbook";
import { useOrderBookSocket } from "./useOrderBookSocket";

export function useOrderBook(outcomeIds: string[], marketId: string) {
  const params = new URLSearchParams();
  outcomeIds.forEach((outcomeId) => {
    params.append("outcomeId[]", outcomeId);
  });
  params.append("depth", "5");
  params.append("currency", "NGN");

  const pollQuery = useQuery({
    queryKey: queryKeys.orderBook(outcomeIds),
    queryFn: ({ signal }) =>
      apiFetch<OrderBook[]>(`v1/pm/books?${params}`, { signal }),
    refetchInterval: 3000,
    refetchIntervalInBackground: false,
    enabled: Boolean(outcomeIds.length),
  });

  const { booksByOutcome, connectionState } = useOrderBookSocket(
    marketId,
    "NGN",
  );

  const hasLiveData = Object.keys(booksByOutcome).length > 0;

  const data =
    connectionState === "open" && hasLiveData
      ? outcomeIds.map((id) => booksByOutcome[id]).filter(Boolean)
      : pollQuery.data;

  return {
    ...pollQuery,
    data,
    isLive: connectionState === "open" && hasLiveData,
    connectionState,
  };
}
