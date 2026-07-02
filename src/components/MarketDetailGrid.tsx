"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import BuySellPanel from "./BuySellPanel";
import MarketHeader from "./MarketHeader";
import OrderBookPanel from "./OrderBookPanel/OrderBookPanel";
import RelatedMarkets from "./RelatedMarkets";
import TimelinePayout from "./TimelinePayout";
import MarketSummary from "./MarketSummary";
import MarketChartPanel from "./MarketChartPanel";
import { useEventBySlug } from "@/hooks/useEventBySlug";

const MarketDetailGrid = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: event, isLoading: isEventLoading } = useEventBySlug(slug);
  const [outcomeId, setOutcomeId] = useState<string | null>(null);

  useEffect(() => {
    if (event?.markets[0]?.outcome1Id) {
      setOutcomeId(event.markets[0].outcome1Id);
    }
  }, [event]);

  return (
    <main className="grid grid-cols-[auto_1fr] border-t border-t-dark-blue-5">
      <div className="pr-[35px] border-r border-r-dark-blue-5 border-stroke pt-7">
        <div className="text-xs font-medium flex gap-x-3 mb-8 items-center text-dark-blue">
          <button className="bg-dark-blue-5 w-6 h-6 rounded-full flex items-center justify-center">
            <ChevronLeftIcon className="w-3 h-3" />
          </button>
          Go back
        </div>
        <MarketHeader
          event={event}
          isLoading={isEventLoading}
          setOutcomeId={setOutcomeId}
        />
        <div className="flex flex-col gap-y-[35px]">
          <div className="flex flex-col gap-y-[46px]">
            <MarketChartPanel
              eventId={event?.markets[0].id ?? ""}
              outcomeId={outcomeId}
            />
            <OrderBookPanel />
            <MarketSummary />
          </div>
          <TimelinePayout />
          <RelatedMarkets />
        </div>
      </div>
      <div className="pl-[45px] pt-[30px]">
        <BuySellPanel />
      </div>
    </main>
  );
};

export default MarketDetailGrid;
