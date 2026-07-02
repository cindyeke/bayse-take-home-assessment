import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiclient";
import { queryKeys } from "@/lib/querykeys";
import { OrderBook } from "@/types/orderbook";

export function useOrderBook(outcomeIds: string[]) {
  const params = new URLSearchParams();
  outcomeIds.forEach((outcomeId) => {
    params.append("outcomeId[]", outcomeId);
  });

  return useQuery({
    queryKey: queryKeys.orderBook(outcomeIds),
    queryFn: ({ signal }) =>
      apiFetch<OrderBook[]>(`v1/pm/books?${params}`, { signal }),
    refetchInterval: 3000,
    enabled: Boolean(outcomeIds.length),
  });
}
