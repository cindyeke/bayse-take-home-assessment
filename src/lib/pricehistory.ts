import { ChartPoint, RawPriceHistoryPoint } from "@/types/pricehistory";
import type { UTCTimestamp } from "lightweight-charts";

export interface PriceSummary {
  currentChancePercent: number;
  changePercent: number;
  direction: "up" | "down";
}
export function derivePriceSummary(
  points: RawPriceHistoryPoint[] | undefined | null,
): PriceSummary | null {
  if (!Array.isArray(points) || points.length === 0) return null;

  const sorted = [...points].sort((a, b) => a.e - b.e);

  const openPrice = sorted[0].p;
  const currentPrice = sorted[sorted.length - 1].p;

  const currentChancePercent = currentPrice * 100;

  const changePercent =
    openPrice === 0 ? 0 : ((currentPrice - openPrice) / openPrice) * 100;

  return {
    currentChancePercent,
    changePercent,
    direction: changePercent >= 0 ? "up" : "down",
  };
}

export function mapPriceHistory(
  points: RawPriceHistoryPoint[] | undefined | null,
): ChartPoint[] {
  if (!Array.isArray(points) || points.length === 0) {
    return [];
  }

  const sorted = [...points].sort((a, b) => a.e - b.e);

  const deduped: ChartPoint[] = [];
  for (const point of sorted) {
    const time = Math.floor(point.e / 1000) as UTCTimestamp;
    const value = point.p * 100;

    const last = deduped[deduped.length - 1];
    if (last && last.time === time) {
      last.value = value;
    } else {
      deduped.push({ time, value });
    }
  }

  return deduped;
}
