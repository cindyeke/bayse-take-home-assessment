import { DummyLevel } from "@/types/orderbook";
import Accordion from "../Accordion";
import OrderBookRow from "./OrderBookRow";

const DUMMY_ASKS: DummyLevel[] = [
  { price: 0.81, quantity: 11463, total: 10228382.87, depthPercent: 45 },
  { price: 0.77, quantity: 13847, total: 1293382.84, depthPercent: 70 },
  { price: 0.69, quantity: 583, total: 128382.55, depthPercent: 100 },
  { price: 0.67, quantity: 3485, total: 84384.48, depthPercent: 55 },
  { price: 0.65, quantity: 463, total: 28384.0, depthPercent: 45 },
];

const DUMMY_BIDS: DummyLevel[] = [
  { price: 0.75, quantity: 847, total: 54382.0, depthPercent: 58 },
  { price: 0.72, quantity: 405, total: 124382.0, depthPercent: 75 },
  { price: 0.66, quantity: 2948, total: 544382.0, depthPercent: 100 },
  { price: 0.61, quantity: 4847, total: 1454382.0, depthPercent: 65 },
  { price: 0.59, quantity: 11203, total: 3454382.0, depthPercent: 15 },
];

const DUMMY_LAST_TRADED_PRICE = 0.65;
const DUMMY_LAST_TRADED_SIDE = "buy";
const DUMMY_SPREAD = 0.05;

const Title = ({ title }: { title: string }) => {
  return (
    <span className="flex gap-x-[6px] font-archivo">
      {title}
      <img src="/icons/roundquestionmark.svg" alt="questionmark" />
    </span>
  );
};

function OrderBookPanel() {
  return (
    <Accordion title={<Title title="Order Book" />}>
      <div className="font-archivo">
        <div className="flex flex-col gap-x-2 pt-[19px] pl-[18px] mb-[14.85px]">
          <div className="flex gap-x-2 font-onest">
            <button className="text-[13px] font-medium text-azure-blue border border-azure-blue bg-light-blue-30 py-[6.5px] px-[14px] rounded-[5px]">
              Yes Offers
            </button>
            <button className="text-xs font-medium border border-dark-blue-10 text-dark-blue-80 py-[6.5px] px-[14px] rounded-[5px]">
              No Offers
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
            {DUMMY_ASKS.map((level) => (
              <OrderBookRow key={level.price} level={level} side="ask" />
            ))}
          </div>
          <div className="relative grid grid-cols-4 items-center pl-[18px] pt-[13px] pb-[9.57px] text-[10px] text-dark-blue-70">
            <span>
              Last Traded Price:{" "}
              <span className="text-secondary-green font-medium">
                ₦{DUMMY_LAST_TRADED_PRICE} ({DUMMY_LAST_TRADED_SIDE})
              </span>
            </span>
            <span></span>
            <span></span>
            <span className="text-center">
              Spread:{" "}
              <span className="text-azure-blue font-medium">
                ₦{DUMMY_SPREAD}
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-y-px">
            {DUMMY_BIDS.map((level) => (
              <OrderBookRow key={level.price} level={level} side="bid" />
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default OrderBookPanel;
