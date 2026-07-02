import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiclient";
import { queryKeys } from "@/lib/querykeys";
import { Ticker } from "@/types/ticker";

export function useTicker(marketId: string, outcomeId: string | null) {
  return useQuery<Ticker, Error>({
    queryKey: queryKeys.ticker(marketId, outcomeId ?? ""),
    queryFn: ({ signal }) =>
      apiFetch<Ticker>(
        `v1/pm/markets/${marketId}/ticker?outcomeId=${outcomeId}`,
        { signal },
      ),
    refetchInterval: 5000,
    enabled: Boolean(marketId) && Boolean(outcomeId),
  });
}
