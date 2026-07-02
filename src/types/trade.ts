import { MarketOutcome } from "./market";

export type TradeSide = "BUY" | "SELL";

export interface Trade {
  id: string;
  marketId: string;
  outcome: MarketOutcome;
  price: number;
  size: number;
  createdAt: string;
}

export interface Pagination {
  page: number;
  size: number;
  totalCount: number;
  lastPage: number;
}

export interface TradesResponse {
  data: Trade[];
  pagination: Pagination;
}
