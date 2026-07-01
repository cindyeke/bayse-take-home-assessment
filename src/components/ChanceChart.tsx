"use client";

import {
  createChart,
  TickMarkType,
  type Time,
  type TickMarkFormatter,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

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

const data = [
  { time: "2025-11-01", value: 20 },
  { time: "2025-11-02", value: 17 },
  { time: "2025-11-03", value: 3 },
  { time: "2025-11-04", value: 9 },
  { time: "2025-11-05", value: 12 },
  { time: "2025-11-06", value: 53 },
  { time: "2025-11-07", value: 46 },
  { time: "2025-11-08", value: 52 },
  { time: "2025-11-09", value: 51 },
  { time: "2025-11-10", value: 15 },
  { time: "2025-11-11", value: 17 },
  { time: "2025-11-12", value: 5 },
  { time: "2025-11-13", value: 33 },
  { time: "2025-11-14", value: 29 },
  { time: "2025-11-15", value: 34 },
  { time: "2025-11-16", value: 21 },
  { time: "2025-11-17", value: 25 },
  { time: "2025-11-18", value: 0 },
  { time: "2025-11-19", value: 24 },
  { time: "2025-11-20", value: 35 },
  { time: "2025-11-21", value: 25 },
  { time: "2025-11-22", value: 28 },
  { time: "2025-11-23", value: 32 },
  { time: "2025-11-24", value: 43 },
  { time: "2025-11-25", value: 55 },
  { time: "2025-11-26", value: 51 },
  { time: "2025-11-27", value: 38 },
  { time: "2025-11-28", value: 36 },
  { time: "2025-11-29", value: 37 },
  { time: "2025-11-30", value: 47 },
];

const ChanceChart = () => {
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

    const series = chart.addLineSeries({
      color: "#0166F4",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });
    series.setData(data);

    return () => chart.remove();
  }, []);

  return (
    <div ref={containerRef} className="h-[290px] w-full overflow-hidden" />
  );
};

export default ChanceChart;
