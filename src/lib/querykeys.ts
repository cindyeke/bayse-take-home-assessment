export const queryKeys = {
  event: (slug: string) => ["event", slug] as const,
  ticker: (marketId: string, outcomeId: string) =>
    ["ticker", marketId, outcomeId] as const,
  orderBook: (outcomeId: string[]) => ["orderBook", outcomeId] as const,
  trades: (marketId: string) => ["trades", marketId] as const,
  priceHistory: (eventId: string) => ["priceHistory", eventId] as const,
};
