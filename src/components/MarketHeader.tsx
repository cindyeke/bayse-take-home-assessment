import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { MarketEvent } from "@/types/market";

const MarketHeader = ({
  event,
  isLoading,
}: {
  event?: MarketEvent;
  isLoading?: boolean;
}) => {
  const market = !isLoading ? event?.markets[0] : null;

  return (
    <div className="flex flex-col gap-y-[21.64px] mb-6">
      <div className="flex pr-[28.54px] items-center justify-between">
        <div className="flex gap-x-[28.85px] items-center">
          {isLoading ? (
            <Skeleton width={84.75} height={84.75} borderRadius="6px" />
          ) : (
            <Image
              src={market?.imageUrl ?? ""}
              alt="market"
              width={84.75}
              height={84.75}
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
          <button className="px-2 bg-white font-semibold rounded-[3px] h-[19px] text-azure-blue mr-4">
            {market?.outcome1Label}
          </button>
          <button className="font-medium h-[19px] text-dark-blue-30">
            {market?.outcome2Label}
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketHeader;
