"use client";

import {
  createChart,
  TickMarkType,
  type Time,
  type TickMarkFormatter,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import { mapPriceHistory } from "@/lib/pricehistory";
import { RawPriceHistoryPoint } from "@/types/pricehistory";

function formatTickDate(time: Time) {
  let year: number;
  let month: number;
  let day: number;

  if (typeof time === "string") {
    [year, month, day] = time.split("-").map(Number);
  } else if (typeof time === "number") {
    const date = new Date(time * 1000);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
  } else {
    ({ year, month, day } = time);
  }

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const formatTickMark: TickMarkFormatter = (time, tickMarkType) => {
  if (
    tickMarkType === TickMarkType.Month ||
    tickMarkType === TickMarkType.DayOfMonth
  ) {
    return formatTickDate(time);
  }
  return null;
};

const ChanceChart = ({
  priceHistory,
}: {
  priceHistory: RawPriceHistoryPoint[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { color: "#fff" },
        textColor: "#4F6B96",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#F2F4F8" },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0, bottom: 0 },
      },
      leftPriceScale: { visible: false },
      timeScale: {
        borderVisible: true,
        borderColor: "#F2F4F8",
        tickMarkFormatter: formatTickMark,
      },
    });

    const s = mapPriceHistory(priceHistory);

    const series = chart.addLineSeries({
      color: "#0166F4",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `${price.toFixed(0)}%`,
      },
    });
    series.setData(s);

    return () => chart.remove();
  }, [priceHistory]);

  return (
    <div ref={containerRef} className="h-[290px] w-full overflow-hidden" />
  );
};

export default ChanceChart;
