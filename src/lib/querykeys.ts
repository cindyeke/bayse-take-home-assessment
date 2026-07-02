export const queryKeys = {
  event: (slug: string) => ["event", slug] as const,
  ticker: (marketId: string) => ["ticker", marketId] as const,
  orderBook: (outcomeId: string[]) => ["orderBook", outcomeId] as const,
  trades: (marketId: string) => ["trades", marketId] as const,
  priceHistory: (eventId: string) => ["priceHistory", eventId] as const,
};
