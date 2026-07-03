import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiclient";
import { queryKeys } from "@/lib/querykeys";
import { PriceHistoryPoint, TimePeriod } from "@/types/pricehistory";
import { MarketOutcome } from "@/types/market";

export function usePriceHistory(
  eventId: string,
  timePeriod: TimePeriod,
  marketIds: string[],
  outcome: MarketOutcome | null,
) {
  const params = new URLSearchParams();
  marketIds.forEach((marketId) => {
    params.append("marketId[]", marketId);
  });
  params.append("outcome", outcome?.label.toUpperCase() ?? "");
  params.append("timePeriod", timePeriod);

  return useQuery({
    queryKey: queryKeys.priceHistory(
      eventId,
      timePeriod,
      marketIds,
      outcome?.label ?? "",
    ),
    queryFn: ({ signal }) =>
      apiFetch<PriceHistoryPoint>(
        `v1/pm/events/${eventId}/price-history?${params}`,
        { signal },
      ),
    enabled: Boolean(eventId),
  });
}

const r =
  "https://relay.bayse.markets/v1/pm/events/8209e7a0-4ac3-472a-8637-e1dc654f0d1c/price-history?marketId%5B%5D=f23e21fd-34bb-4a8e-904d-6dda9b0dd5c4&outcome=Yes&timePeriod=1W";
