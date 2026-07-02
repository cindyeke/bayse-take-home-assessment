export type EventStatus = "open" | "closed";
export type MarketStatus = "open" | "closed";
export type SupportedCurrency = "USD" | "NGN";
export type MarketOutcome = "YES" | "NO";

export interface Market {
  id: string;
  title: string;
  status: MarketStatus;
  imageUrl: string;
  outcome1Id: string;
  outcome1Label: string;
  outcome1Price: number;
  outcome2Id: string;
  outcome2Label: string;
  outcome2Price: number;
  yesBuyPrice: number;
  noBuyPrice: number;
  feePercentage: number;
  totalOrders: number;
  marketThreshold: number;
  rules: string;
}

export interface MarketEvent {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  engine: string;
  status: EventStatus;
  openingDate: string;
  closingDate: string;
  resolutionDate: string;
  assetSymbolPair: string;
  eventThreshold: number;
  seriesSlug: string;
  liquidity: number;
  totalVolume: number;
  totalOrders: number;
  supportedCurrencies: SupportedCurrency[];
  userWatchlisted: boolean;
  markets: Market[];
}
