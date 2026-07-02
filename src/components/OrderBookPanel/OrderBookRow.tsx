import { DepthLevel } from "@/types/orderbook";
import { formatAmount, formatPrice } from "@/util/format";

const OrderBookRow = ({
  level,
  side,
}: {
  level: DepthLevel;
  side: "ask" | "bid";
}) => {
  const isAsk = side === "ask";

  return (
    <div className="relative grid grid-cols-4 items-center pt-[13px] pb-[9.57px] text-[10px] text-dark-blue-70 group">
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 ${isAsk ? "bg-red-7" : "bg-green-10 group-last:rounded-bl-lg"}`}
        style={{ width: `${level.depthPercent}%` }}
      />
      <div>
        <div
          className={`hidden text-[8px] py-[4px] px-[20px] w-fit font-medium text-white rounded-[5px] ml-[14px] ${isAsk ? "group-last:block bg-secondary-red" : "group-first:block bg-secondary-green"}`}
        >
          {isAsk ? "Asks" : "Bids"}
        </div>
      </div>
      <div
        className={`relative font-semibold text-center text-xs ${isAsk ? "text-secondary-red" : "text-secondary-green"}`}
      >
        ₦{formatPrice(level.price)}
      </div>
      <div className="relative text-center font-medium">
        {formatAmount(level.quantity)}
      </div>
      <div className="relative text-center font-medium">
        ₦{formatAmount(level.total)}
      </div>
    </div>
  );
};

export default OrderBookRow;
