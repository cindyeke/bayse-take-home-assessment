"use client";
import { useState } from "react";

import ChanceHeader from "./ChanceHeader";
import ChartTimeRangeSelector from "./ChartTimeRangeSelector";
import MarketStats from "./MarketStats";
import ChanceChart from "./ChanceChart";
import { TimePeriod } from "@/types/pricehistory";
import { usePriceHistory } from "@/hooks/usePriceHistory";
import { Event } from "@/types/market";
import { RawPriceHistoryPoint } from "@/types/pricehistory";

const MarketChartPanel = ({
  event,
  outcome,
}: {
  event: Event;
  outcome: { outcomeLabel: string; outcomeId: string } | null;
}) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1W");
  const { data: priceHistory, isLoading: isPriceHistoryLoading } =
    usePriceHistory(
      event?.id ?? "",
      timePeriod,
      [event?.markets[0].id ?? ""],
      outcome,
    );

  console.log({ priceHistory });

  return (
    <div className="flex flex-col items-center gap-y-[33px]">
      <div className="w-full">
        <ChanceHeader />
        <ChanceChart
          priceHistory={
            priceHistory?.markets?.[0]?.priceHistory ??
            ([] as RawPriceHistoryPoint[])
          }
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <ChartTimeRangeSelector
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
        />
        <MarketStats />
      </div>
    </div>
  );
};

export default MarketChartPanel;
