import { TradeSide } from "./trade";

export interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
}

export interface OrderBook {
  marketId: string;
  outcomeId: string;
  timestamp: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  lastTradedPrice: number;
  lastTradedSide: TradeSide;
}

export type OrderBookResponse = OrderBook[];