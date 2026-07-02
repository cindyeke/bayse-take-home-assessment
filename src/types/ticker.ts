import { MarketOutcome } from "./market";

export interface Ticker {
  marketId: string;
  outcome: MarketOutcome;
  lastPrice: number;
  bestBid: number;
  bestAsk: number;
  midPrice: number;
  spread: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  tradeCount24h: number;
  timestamp: string;
}
