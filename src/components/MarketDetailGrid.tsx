import BuySellPanel from "./BuySellPanel";
import MarketHeader from "./MarketHeader";
import OrderBookPanel from "./OrderBookPanel/OrderBookPanel";
import RelatedMarkets from "./RelatedMarkets";
import TimelinePayout from "./TimelinePayout";
import MarketSummary from "./MarketSummary";
import MarketChartPanel from "./MarketChartPanel";

const MarketDetailGrid = () => {
  return (
    <div className="grid grid-cols-[1fr_363px] px-[120px]">
      <div className="pr-[35px] border-r border-r-dark-blue-5 border-stroke">
        {/* TO-DO:  add button to go back to markets page */}
        <span>Go back</span>
        <MarketHeader />
        <div className="flex flex-col gap-y-[35px]">
          <div className="flex flex-col gap-y-[46px]">
            <MarketChartPanel />
            <OrderBookPanel />
            <MarketSummary />
          </div>
          <TimelinePayout />
          <RelatedMarkets />
        </div>
      </div>
      <div className="pl-[45px]">
        <BuySellPanel />
      </div>
    </div>
  );
};

export default MarketDetailGrid;
