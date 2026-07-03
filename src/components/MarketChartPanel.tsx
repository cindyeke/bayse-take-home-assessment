"use client";
import { useState } from "react";

import ChanceHeader from "./ChanceHeader";
import ChartTimeRangeSelector from "./ChartTimeRangeSelector";
import MarketStats from "./MarketStats";
import ChanceChart from "./ChanceChart";
import { TimePeriod } from "@/types/pricehistory";
import { usePriceHistory } from "@/hooks/usePriceHistory";
import { Event, MarketOutcome } from "@/types/market";

const MarketChartPanel = ({
  event,
  outcome,
}: {
  event: Event;
  outcome: MarketOutcome | null;
}) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1W");

  const marketId = event?.markets?.[0]?.id;
  const isMarketReady = Boolean(event?.id && marketId);

  const {
    data: chartPriceHistory,
    isLoading: isChartQueryLoading,
    isError: isChartError,
    refetch: refetchChart,
  } = usePriceHistory(event?.id ?? "", timePeriod, [marketId ?? ""], outcome);

  const {
    data: dailyPriceHistory,
    isLoading: isDailyQueryLoading,
    isError: isDailyError,
    refetch: refetchDaily,
  } = usePriceHistory(
    event?.id ?? "",
    "24H" as TimePeriod,
    [marketId ?? ""],
    outcome,
  );

  const isLoading =
    !isMarketReady || isChartQueryLoading || isDailyQueryLoading;
  const isError = isChartError || isDailyError;

  const chartPoints = chartPriceHistory?.markets?.[0]?.priceHistory ?? [];
  const dailyPoints = dailyPriceHistory?.markets?.[0]?.priceHistory ?? [];
  const isEmpty = !isLoading && !isError && chartPoints.length === 0;

  const renderChartArea = () => {
    if (isLoading) {
      return (
        <div className="w-full h-[290px] flex items-center justify-center text-[13px] text-dark-blue-50">
          Loading price history…
        </div>
      );
    }

    if (isError) {
      return (
        <div className="w-full h-[290px] flex flex-col items-center justify-center gap-y-2">
          <span className="text-[13px] text-dark-blue-50">
            Couldn't load price history.
          </span>
          <button
            type="button"
            onClick={() => {
              refetchChart();
              refetchDaily();
            }}
            className="text-[13px] font-medium text-azure-blue"
          >
            Retry
          </button>
        </div>
      );
    }

    if (isEmpty) {
      return (
        <div className="w-full h-[290px] flex items-center justify-center text-[13px] text-dark-blue-50">
          No price history available yet.
        </div>
      );
    }

    return (
      <>
        <ChanceHeader priceHistory={dailyPoints} />
        <ChanceChart priceHistory={chartPoints} />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center gap-y-[33px]">
      <div className="w-full h-[290px] flex flex-col">{renderChartArea()}</div>
      <div className="w-full flex flex-col items-center">
        <ChartTimeRangeSelector
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
        />
        <MarketStats event={event} />
      </div>
    </div>
  );
};

export default MarketChartPanel;
