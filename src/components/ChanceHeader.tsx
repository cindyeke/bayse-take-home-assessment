import { derivePriceSummary } from "@/lib/pricehistory";
import { RawPriceHistoryPoint } from "@/types/pricehistory";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

const ChanceHeader = ({
  priceHistory,
}: {
  priceHistory: RawPriceHistoryPoint[];
}) => {
  const summary = derivePriceSummary(priceHistory);
  if (!summary) return null;
  return (
    <div className="h-11 flex justify-between items-center">
      <div className="flex items-center gap-x-[10.82px]">
        <div className="flex flex-col leading-[100%]">
          <span className="font-bold text-2xl text-azure-blue">
            {Math.round(summary.currentChancePercent)}%
          </span>
          <span className="font-medium text-[9.02px] tracking-[30%] text-azure-blue-light">
            CHANCE
          </span>
        </div>
        <div className="flex items-center gap-x-[4.51px] font-archivo text-[14px]">
          {summary.direction === "up" ? (
            <ArrowUpIcon className="w-4 h-4 text-secondary-green" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-secondary-red" />
          )}
          <span
            className={`${summary.direction === "up" ? "text-secondary-green" : "text-secondary-red"}`}
          >
            {Math.abs(summary.changePercent).toFixed(0)}%
          </span>
          <span className="text-dark-blue-80">today</span>
        </div>
      </div>
    </div>
  );
};

export default ChanceHeader;
