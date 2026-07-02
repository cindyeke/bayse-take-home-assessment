import { TradeSide } from "./trade";

export interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
}

export interface DepthLevel extends OrderBookLevel {
  depthPercent: number;
}

export interface OrderBook {
  marketId: string;
  outcomeId: string;
  timestamp: string;
  asks: OrderBookLevel[];
  bids: OrderBookLevel[];
  lastTradedPrice: number;
  lastTradedSide: TradeSide;
}
