// components/OrderBookPanel.tsx — Phase 1: static structure only

import Accordion from "./Accordion";

interface DummyLevel {
  price: number;
  quantity: number;
  total: number;
  depthPercent: number; // hardcoded for now, just to render bar widths
}

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

const Title = ({
  title,
  chevronup = false,
}: {
  title: string;
  chevronup?: boolean;
}) => {
  return (
    <>
      <span className="flex gap-x-[6px]">
        {title}
        <img src="/icons/roundquestionmark.svg" alt="questionmark" />
      </span>
      {chevronup && <img src="/icons/chevronup.svg" alt="chevronup" />}
    </>
  );
};

function OrderBookPanel() {
  return (
    // <section
    //   aria-labelledby="orderbook-heading"
    //   className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
    // >
    //   {/* header bar */}
    //   <div className="flex items-center justify-between bg-neutral-50 px-6 py-4">
    //     <div className="flex items-center gap-2">
    //       <h2
    //         id="orderbook-heading"
    //         className="text-lg font-semibold text-neutral-700"
    //       >
    //         Order Book
    //       </h2>
    //       {/* <button type="button" aria-label="Order book help">
    //         <HelpIcon aria-hidden="true" className="text-brand-500" />
    //       </button> */}
    //     </div>
    //     {/* <button type="button" aria-label="Collapse order book">
    //       <ChevronUpIcon aria-hidden="true" />
    //     </button> */}
    //   </div>

    //   <div className="px-6 py-4">
    //     {/* Yes Offers / No Offers toggle */}
    //     <div className="flex gap-2 mb-4" role="group" aria-label="Offer side">
    //       <button
    //         type="button"
    //         aria-pressed="true"
    //         className="rounded-md border border-brand-500 px-4 py-2 text-sm font-medium text-brand-600"
    //       >
    //         Yes Offers
    //       </button>
    //       <button
    //         type="button"
    //         aria-pressed="false"
    //         className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-500"
    //       >
    //         No Offers
    //       </button>
    //     </div>

    //     {/* column headers */}
    //     <div className="grid grid-cols-3 px-2 py-2 text-xs font-semibold uppercase text-neutral-400 border-b border-neutral-200">
    //       <span>Their Price</span>
    //       <span className="text-right">Shares</span>
    //       <span className="text-right">Total Amount</span>
    //     </div>

    //     {/* asks */}
    //     <div>
    //       {DUMMY_ASKS.map((level) => (
    //         <OrderBookRow key={level.price} level={level} side="ask" />
    //       ))}
    //     </div>

    //     {/* last traded / spread row */}
    //     <div className="flex items-center justify-between px-2 py-3 text-sm border-y border-neutral-200">
    //       <span className="text-neutral-500">
    //         Last Traded Price:{" "}
    //         <span className="text-bid font-medium">
    //           ₦{DUMMY_LAST_TRADED_PRICE} ({DUMMY_LAST_TRADED_SIDE})
    //         </span>
    //       </span>
    //       <span className="text-neutral-500">
    //         Spread:{" "}
    //         <span className="text-brand-600 font-medium">₦{DUMMY_SPREAD}</span>
    //       </span>
    //     </div>

    //     {/* bids */}
    //     <div>
    //       {DUMMY_BIDS.map((level) => (
    //         <OrderBookRow key={level.price} level={level} side="bid" />
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <Accordion title={<Title title="Order Book" chevronup />}>
      <div className="flex gap-x-2 pt-[19px] pl-[18px]">
        <button className="text-[13px] font-medium text-azure-blue border border-azure-blue bg-light-blue-30 py-[6.5px] px-[14px] rounded-[5px]">
          Yes Offers
        </button>
        <button className="text-xs font-medium border border-dark-blue-10 text-dark-blue-80 py-[6.5px] px-[14px] rounded-[5px]">
          No Offers
        </button>
      </div>
    </Accordion>
  );
}

function OrderBookRow({
  level,
  side,
}: {
  level: DummyLevel;
  side: "ask" | "bid";
}) {
  const isAsk = side === "ask";
  return (
    <div className="relative grid grid-cols-3 items-center px-2 py-2 text-sm">
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 ${isAsk ? "bg-ask-bg" : "bg-bid-bg"}`}
        style={{ width: `${level.depthPercent}%` }}
      />
      <span
        className={`relative font-medium ${isAsk ? "text-ask" : "text-bid"}`}
      >
        ₦{level.price}
      </span>
      <span className="relative text-right text-neutral-700">
        {level.quantity.toLocaleString()}
      </span>
      <span className="relative text-right text-neutral-700">
        ₦{level.total.toLocaleString()}
      </span>
    </div>
  );
}

export default OrderBookPanel;
