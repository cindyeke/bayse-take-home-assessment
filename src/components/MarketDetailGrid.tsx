import BuySellPanel from "./BuySellPanel";
import MarketHeader from "./MarketHeader";
import OrderBookPanel from "./OrderBookPanel";
import PriceChartPanel from "./PriceChartPanel";
import RelatedMarkets from "./RelatedMarkets";
import TimelinePayout from "./TimelinePayout";
import MarketSummary from "./MarketSummary";

const MarketDetailGrid = () => {
  return (
    <div className="grid grid-cols-[1fr_363px] px-[120px]">
      <div className="pr-[35px] border-r border-r-dark-blue-5 border-stroke">
        {/* TO-DO:  add button to go back to markets page */}
        <span>Go back</span>
        <MarketHeader />
        <PriceChartPanel />
        <OrderBookPanel />
        <MarketSummary />
        <TimelinePayout />
        <RelatedMarkets />
      </div>
      <div className="pl-[45px]">
        <BuySellPanel />
      </div>
    </div>
  );
};

export default MarketDetailGrid;
