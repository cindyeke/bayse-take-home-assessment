import { Market } from "@/types/market";

const MarketSummary = ({ market }: { market: Market }) => {
  return (
    <div className="border border-dark-blue-10 pt-6 pl-6 pr-8 pb-[29.39px] rounded-[7.21px] bg-grey-light">
      <h2 className="text-dark-blue font-semibold text-[14px] mb-[10.82px]">
        Market Summary & Rules
      </h2>
      <p className="text-dark-blue-70 text-xs text-justify mb-[17.8px] leading-[21.64px] tracking-[-1%]">
        {market?.rules ?? ""}
      </p>
      <button className="text-[10.82px] font-semibold text-azure-blue border border-azure-blue rounded-[18.03px] leading-[19.84px] px-[10.82px]">
        Show more
      </button>
    </div>
  );
};

export default MarketSummary;
