"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { memo, useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";
import BuySellPanel from "./BuySellPanel";
import MarketHeader from "./MarketHeader";
import OrderBookPanel from "./OrderBookPanel/OrderBookPanel";
import RelatedMarkets from "./RelatedMarkets";
import TimelinePayout from "./TimelinePayout";
import MarketSummary from "./MarketSummary";
import MarketChartPanel from "./MarketChartPanel";
import { useEventBySlug } from "@/hooks/useEventBySlug";
import { Event, Market, MarketOutcome } from "@/types/market";

const MarketDetailGrid = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: event,
    isLoading: isEventLoading,
    isError,
    refetch,
  } = useEventBySlug(slug);
  const [outcome, setOutcome] = useState<MarketOutcome | null>(null);

  useEffect(() => {
    if (event?.markets[0]?.outcome1Id) {
      setOutcome({
        label: event.markets[0].outcome1Label,
        id: event.markets[0].outcome1Id,
        price: event.markets[0].outcome1Price,
      });
    }
  }, [event]);

  const outcome1: MarketOutcome = useMemo(
    () => ({
      id: event?.markets[0]?.outcome1Id ?? "",
      label: event?.markets[0]?.outcome1Label ?? "",
      price: event?.markets[0]?.outcome1Price ?? 0,
    }),
    [event?.markets],
  );

  const outcome2: MarketOutcome = useMemo(
    () => ({
      id: event?.markets[0]?.outcome2Id ?? "",
      label: event?.markets[0]?.outcome2Label ?? "",
      price: event?.markets[0]?.outcome2Price ?? 0,
    }),
    [event?.markets],
  );

  const MemoizedRelatedMarkets = memo(RelatedMarkets);
  const MemoizedTimelinePayout = memo(TimelinePayout);

  return (
    <main className="grid grid-cols-[757px_1fr] border-t border-t-dark-blue-5">
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
          isError={isError}
          onRetry={refetch}
          outcome={outcome}
          setOutcome={setOutcome}
        />
        <div className="flex flex-col gap-y-[35px]">
          <div className="flex flex-col gap-y-[46px]">
            <MarketChartPanel event={event as Event} outcome={outcome} />
            <OrderBookPanel outcome1={outcome1} outcome2={outcome2} />
            <MarketSummary
              market={event?.markets[0] as Market}
              isLoading={isEventLoading}
            />
          </div>
          <MemoizedTimelinePayout
            event={event as Event}
            isLoading={isEventLoading}
          />
          <MemoizedRelatedMarkets />
        </div>
      </div>
      <div className="pl-[45px] pt-[30px]">
        <BuySellPanel />
      </div>
    </main>
  );
};

export default MarketDetailGrid;
