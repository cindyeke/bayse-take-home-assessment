import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiclient";
import { queryKeys } from "@/lib/querykeys";
import type { Event } from "@/types/market";

export const useEventBySlug = (slug: string) => {
  return useQuery<Event, Error>({
    queryKey: queryKeys.event(slug),
    queryFn: ({ signal }) =>
      apiFetch<Event>(`v1/pm/events/slug/${slug}`, { signal }),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(slug),
  });
};
