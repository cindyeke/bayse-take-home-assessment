import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiclient";
import { queryKeys } from "@/lib/querykeys";
import { PriceHistoryPoint } from "@/types/pricehistory";

export type TimePeriod = "12H" | "24H" | "1W" | "1M" | "1Y";

export function usePriceHistory(
  eventId: string,
  timePeriod: TimePeriod,
  marketIds: string[],
  outcome: string,
) {
  const params = new URLSearchParams();
  marketIds.forEach((marketId) => {
    params.append("marketId[]", marketId);
  });
  params.append("depth", "5");
  params.append("currency", "NGN");

  return useQuery({
    queryKey: queryKeys.priceHistory(eventId, timePeriod, marketIds, outcome),
    queryFn: ({ signal }) =>
      apiFetch<PriceHistoryPoint[]>(
        `v1/pm/events/${eventId}/price-history?${params}`,
        { signal },
      ),
    enabled: Boolean(eventId),
  });
}
