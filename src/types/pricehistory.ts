import { UTCTimestamp } from "lightweight-charts";
import { MarketOutcome } from "./market";

export type TimePeriod = "12H" | "24H" | "1W" | "1M" | "1Y";

export interface RawPriceHistoryPoint {
  e: number;
  p: number;
}

export interface ChartPoint {
  time: UTCTimestamp;
  value: number;
}

export interface PriceHistoryPoint {
  markets: MarketPriceHistoryPoint[];
}

export interface MarketPriceHistoryPoint {
  priceHistory: RawPriceHistoryPoint[];
}

export type PriceHistoryResponse = Record<string, PriceHistoryPoint[]>;
