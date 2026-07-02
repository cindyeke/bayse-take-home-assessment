import { useState } from "react";
import { useOrderBook } from "@/hooks/useOrderBook";
import { deriveOrderBook } from "@/lib/orderbook";
import Accordion from "../Accordion";
import OrderBookRow from "./OrderBookRow";
import { formatPrice } from "@/util/format";

const Title = ({ title }: { title: string }) => {
  return (
    <span className="flex gap-x-[6px] font-archivo">
      {title}
      <img src="/icons/roundquestionmark.svg" alt="questionmark" />
    </span>
  );
};

const OrderBookPanel = ({
  outcome1,
  outcome2,
}: {
  outcome1: { id: string; label: string };
  outcome2: { id: string; label: string };
}) => {
  const {
    data: orderBooks,
    isLoading,
    isError,
    refetch,
  } = useOrderBook([outcome1.id, outcome2.id]);

  const [userSelectedOutcome, setUserSelectedOutcome] = useState<string | null>(
    null,
  );

  const activeOutcomeId = userSelectedOutcome ?? outcome1.id;

  const snapshot =
    orderBooks?.find((ob) => ob.outcomeId === activeOutcomeId) ?? null;

  const handleOfferClick = (outcomeId: string) => {
    setUserSelectedOutcome(outcomeId);
  };

  if (isLoading) {
    return (
      <Accordion title={<Title title="Order Book" />}>
        <div className="font-archivo px-[18px] py-[24px] text-[13px] text-dark-blue-50">
          Loading order book…
        </div>
      </Accordion>
    );
  }

  if (isError) {
    return (
      <Accordion title={<Title title="Order Book" />}>
        <div className="font-archivo px-[18px] py-[24px] flex flex-col gap-y-2">
          <span className="text-[13px] text-dark-blue-50">
            Couldn't load the order book.
          </span>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-[13px] font-medium text-azure-blue self-start"
          >
            Retry
          </button>
        </div>
      </Accordion>
    );
  }

  if (!snapshot || (snapshot.bids.length === 0 && snapshot.asks.length === 0)) {
    return (
      <Accordion title={<Title title="Order Book" />}>
        <div className="font-archivo px-[18px] py-[24px] text-[13px] text-dark-blue-50">
          No open orders for this market yet.
        </div>
      </Accordion>
    );
  }

  const { bidDepth, askDepth, spread } = deriveOrderBook(
    snapshot.bids,
    snapshot.asks,
  );

  return (
    <Accordion title={<Title title="Order Book" />}>
      <div className="font-archivo">
        <div className="flex flex-col gap-x-2 pt-[19px] pl-[18px] mb-[14.85px]">
          <div className="flex gap-x-2 font-onest capitalize">
            <button
              className={`text-[13px] font-medium py-[6.5px] px-[14px] rounded-[5px] ${
                activeOutcomeId === outcome1.id
                  ? "bg-light-blue-30 text-azure-blue border border-azure-blue"
                  : "border border-dark-blue-10 text-dark-blue-80"
              }`}
              onClick={() => handleOfferClick(outcome1.id)}
            >
              {outcome1.label} Offers
            </button>
            <button
              className={`text-xs font-medium py-[6.5px] px-[14px] rounded-[5px] ${
                activeOutcomeId === outcome2.id
                  ? "bg-light-blue-30 text-azure-blue border border-azure-blue"
                  : "border border-dark-blue-10 text-dark-blue-80"
              }`}
              onClick={() => handleOfferClick(outcome2.id)}
            >
              {outcome2.label} Offers
            </button>
          </div>
        </div>
        <div className="px-1 pb-1">
          <div className="grid grid-cols-4 pb-[10px] font-semibold uppercase text-dark-blue-50 border-b border-b-dark-blue-10 font-onest items-center">
            <div className="">
              <div className="ml-[14px] border border-azure-blue-lighter bg-secondary py-[6px] px-[7px] rounded-[3px] w-fit shadow-[-1.94px_1.94px_3.89px_0px_rgba(0,0,0,0.08)]">
                <img
                  src="/icons/groupedline.svg"
                  alt="groupedline"
                  className="w-[11.08px] h-[11.08px] "
                />
              </div>
            </div>
            <span className="text-center self-end">Their Price</span>
            <span className="text-center self-end">Shares</span>
            <span className="text-center self-end">Total Amount</span>
          </div>
          <div className="flex flex-col gap-y-px">
            {askDepth.map((level) => (
              <OrderBookRow key={level.price} level={level} side="ask" />
            ))}
          </div>
          <div className="relative grid grid-cols-4 items-center pl-[18px] pt-[13px] pb-[9.57px] text-[10px] text-dark-blue-70">
            <span>
              Last Traded Price:{" "}
              <span
                className={`${
                  snapshot.lastTradedSide === "SELL"
                    ? "text-secondary-red"
                    : "text-secondary-green"
                } font-medium`}
              >
                ₦{formatPrice(snapshot.lastTradedPrice)} (
                {snapshot.lastTradedSide.toLowerCase()})
              </span>
            </span>
            <span></span>
            <span></span>
            <span className="text-center">
              Spread:{" "}
              <span className="text-azure-blue font-medium">
                ₦{formatPrice(spread ?? 0)}
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-y-px">
            {bidDepth.map((level) => (
              <OrderBookRow key={level.price} level={level} side="bid" />
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default OrderBookPanel;
