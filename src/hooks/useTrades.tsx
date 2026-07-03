import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiclient";
import { queryKeys } from "@/lib/querykeys";
import { PriceHistoryPoint, TimePeriod } from "@/types/pricehistory";
import { MarketOutcome } from "@/types/market";

export function useTrades(
  marketIds: string[],
) {
  const params = new URLSearchParams();
  marketIds.forEach((marketId) => {
    params.append("marketId[]", marketId);
  });

  return useQuery({
    queryKey: queryKeys.trades(
      marketIds,
    ),
    queryFn: ({ signal }) =>
      apiFetch<PriceHistoryPoint>(`v1/pm/trades?${params}`, { signal }),
    enabled: Boolean(marketIds.length > 0),
  });
}

