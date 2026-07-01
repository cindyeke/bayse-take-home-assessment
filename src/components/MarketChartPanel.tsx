import ChanceHeader from "./ChanceHeader";
import ChartTimeRangeSelector from "./ChartTimeRangeSelector";
import MarketStats from "./MarketStats";
import ChanceChart from "./ChanceChart";

const MarketChartPanel = () => {
  return (
    <div className="flex flex-col items-center gap-y-[33px]">
      <div className="w-full">
        <ChanceHeader />
        <ChanceChart />
      </div>
      <div className="w-full flex flex-col items-center">
        <ChartTimeRangeSelector />
        <MarketStats />
      </div>
    </div>
  );
};

export default MarketChartPanel;
