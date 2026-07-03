import { Event } from "@/types/market";
import { formatDate } from "@/util/format";

const MarketStats = ({ event }: { event: Event }) => {
  return (
    <div className="bg-dark-blue-5 h-[48px] flex items-center justify-center border-t border-b border-t-dark-blue-5 border-b-dark-blue-5 w-full text-dark-blue-40 text-xs divide-x divide-dark-blue-10">
      <div className="pr-[74.09px] flex gap-x-1.5">
        <img src="/icons/chart.svg" alt="chart" />
        <span>{event?.totalOrders ?? 0} trades</span>
      </div>
      <div className="px-[74.09px] flex gap-x-1.5">
        <img src="/icons/droplets.svg" alt="droplets" />
        <span>200K</span>
      </div>
      <div className="pl-[74.09px] flex gap-x-1.5">
        <img src="/icons/clock.svg" alt="clock" />
        <span>{formatDate(event?.closingDate ?? "")}</span>
      </div>
    </div>
  );
};

export default MarketStats;
