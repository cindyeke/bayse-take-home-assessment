import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Event, MarketOutcome } from "@/types/market";

const MarketHeader = ({
  event,
  isLoading,
  outcome,
  setOutcome,
}: {
  event?: Event;
  isLoading?: boolean;
  outcome: MarketOutcome | null;
  setOutcome: Dispatch<SetStateAction<MarketOutcome | null>>;
}) => {
  const market = !isLoading ? event?.markets[0] : null;

  const activeOutcomeId = outcome?.id;

  return (
    <div className="flex flex-col gap-y-[21.64px] mb-6">
      <div className="flex pr-[28.54px] items-center justify-between gap-x-3">
        <div className="flex gap-x-[28.85px] items-center">
          {isLoading ? (
            <Skeleton width={84.75} height={84.75} borderRadius="6px" />
          ) : (
            <Image
              src={event?.imageUrl ?? ""}
              alt="market"
              width={84.75}
              height={84.75}
              className="w-[84.75px] h-[84.75px] object-cover shrink-0 rounded-[7.21px]"
            />
          )}

          <h1 className="text-dark-blue font-bold text-2xl min-w-[200px]">
            {isLoading ? (
              <Skeleton width={300} height={24} />
            ) : (
              (event?.title ?? market?.title)
            )}
          </h1>
        </div>

        <div className="flex gap-x-[13.24px]">
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

      {isLoading ? (
        <Skeleton width={100} height={24} />
      ) : (
        <div className="w-fit p-[6px] bg-secondary font-archivo text-[10px] rounded-[5px]">
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
  );
};

export default MarketHeader;
