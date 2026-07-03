import { ChartPoint, RawPriceHistoryPoint } from "@/types/pricehistory";
import type { UTCTimestamp } from "lightweight-charts";

export function mapPriceHistory(
  points: RawPriceHistoryPoint[] | undefined | null,
): ChartPoint[] {
  if (!Array.isArray(points)) {
    return [];
  }
  return points.map((point) => ({
    time: Math.floor(point.e / 1000) as UTCTimestamp,
    value: point.p * 100,
  }));
}
