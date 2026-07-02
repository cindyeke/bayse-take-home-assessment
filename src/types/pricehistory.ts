import { MarketOutcome } from "./market";

export interface PriceHistoryPoint {
  outcome: MarketOutcome;
  price: number;
  timestamp: string;
}

export type PriceHistoryResponse = Record<string, PriceHistoryPoint[]>;
