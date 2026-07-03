import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Event, MarketOutcome } from "@/types/market";

const MarketHeader = ({
  event,
  isLoading,
  isError,
  onRetry,
  outcome,
  setOutcome,
}: {
  event?: Event;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  outcome: MarketOutcome | null;
  setOutcome: Dispatch<SetStateAction<MarketOutcome | null>>;
}) => {
  if (isError) {
    return (
      <div className="flex flex-col gap-y-2 mb-6 p-4 border border-dark-blue-10 rounded-[7.21px]">
        <span className="text-[13px] text-dark-blue-50">
          Couldn't load this market.
        </span>
        <button
          type="button"
          onClick={onRetry}
          className="text-[13px] font-medium text-azure-blue self-start"
        >
          Retry
        </button>
      </div>
    );
  }

  const market = !isLoading ? event?.markets[0] : null;

  if (!isLoading && !event) {
    return (
      <div className="mb-6 p-4 text-[13px] text-dark-blue-50">
        Market not found.
      </div>
    );
  }

  const activeOutcomeId = outcome?.id;

  return (
    <div className="flex flex-col gap-y-[21.64px] mb-6 w-full">
      <div className="flex pr-[28.54px] items-center justify-between gap-x-3">
        <div className="flex gap-x-[28.85px] items-center min-w-0 flex-1">
          {isLoading ? (
            <Skeleton
              width={84.75}
              height={84.75}
              borderRadius="6px"
              containerClassName="shrink-0"
            />
          ) : (
            <Image
              src={event?.imageUrl ?? ""}
              alt="market"
              width={84.75}
              height={84.75}
              className="w-[84.75px] h-[84.75px] object-cover shrink-0 rounded-[7.21px]"
            />
          )}

          <h1 className="text-dark-blue font-bold text-2xl min-w-0 flex-1 whitespace-normal">
            {isLoading ? (
              <Skeleton height={24} width="100%" />
            ) : (
              (event?.title ?? market?.title)
            )}
          </h1>
        </div>

        <div className="flex gap-x-[13.24px] shrink-0">
          <img
            src="/icons/save.svg"
            alt="save"
            className="w-[13.82px] h-[17.94px]"
          />
          <img
            src="/icons/share.svg"
            alt="share"
            className="w-[18px] h-[18px]"
          />
        </div>
      </div>

      <div className="w-fit min-h-[31px]">
        {isLoading ? (
          <Skeleton width={140} height={31} borderRadius="5px" />
        ) : (
          <div className="p-[6px] bg-secondary font-archivo text-[10px] rounded-[5px]">
            <button
              className={`rounded-[3px] h-[19px] mr-4 ${activeOutcomeId === market?.outcome1Id ? "px-2 font-semibold bg-white text-azure-blue" : "font-medium text-dark-blue-30"}`}
              onClick={() =>
                setOutcome({
                  label: market?.outcome1Label ?? "",
                  id: market?.outcome1Id ?? "",
                  price: market?.outcome1Price ?? 0,
                })
              }
            >
              {market?.outcome1Label}
            </button>
            <button
              className={` h-[19px] rounded-[3px] ${activeOutcomeId === market?.outcome2Id ? "px-2 font-semibold bg-white text-azure-blue" : "font-medium text-dark-blue-30"}`}
              onClick={() =>
                setOutcome({
                  label: market?.outcome2Label ?? "",
                  id: market?.outcome2Id ?? "",
                  price: market?.outcome2Price ?? 0,
                })
              }
            >
              {market?.outcome2Label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketHeader;
