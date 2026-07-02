import { ArrowsUpDownIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const BuySellPanel = () => {
  return (
    <div className="border border-stroke-light rounded-[15px] py-8 px-[27px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex bg-dark-blue-5 rounded-lg text-[11px] leading-[20.78px]">
          <button className="px-5 py-[7px] rounded-[8px] font-semibold bg-azure-blue text-white">
            Buy
          </button>
          <button className="px-5 py-2 rounded-[8px] font-semibold text-dark-blue-80">
            Sell
          </button>
        </div>

        <button className="flex items-center gap-2 bg-azure-blue-light/10 border border-dark-blue-10 text-dark-blue-40 text-[10px] font-semibold px-4 py-2.5 rounded-[5.26px]">
          Set your Price
          <ArrowsUpDownIcon className="w-4 h-4" />
        </button>
      </div>

      <button className="flex items-center gap-2 bg-azure-blue/5 text-azure-blue font-semibold px-4 py-[6px] rounded-[2px] text-xs mb-[103px]">
        Buy Yes
        <ArrowPathIcon className="w-4 h-4" />
      </button>

      <div className="flex flex-col items-center mb-[103px]">
        <span className="bg-grey text-dark-blue-60 text-[9px] p-[5px] rounded-[5px] mb-[14px] font-medium">
          Your Balance: ₦200,000
        </span>

        <p className="text-6xl font-extrabold text-dark-blue-20">₦0</p>
      </div>

      <div className="flex gap-[3px] mb-4 font-archivo">
        <button className="bg-dark-blue-5 flex items-center gap-[2.5px] py-[9px] px-[6px] border border-azure-blue-light/30 rounded-sm text-dark-blue-50 text-xs whitespace-nowrap">
          <ArrowPathIcon className="w-4 h-4" />
          ₦1,500
        </button>

        <button className="flex-1 border border-azure-blue-light/30 rounded-sm py-[9px] px-[6px] text-dark-blue-50 text-xs whitespace-nowrap">
          +₦1,000
        </button>

        <button className="flex-1 border border-azure-blue-light/30 rounded-sm py-[9px] px-[6px] text-dark-blue-50 text-xs whitespace-nowrap">
          +₦5,000
        </button>

        <button className="flex-1 border border-azure-blue-light/30 rounded-sm py-[9px] px-[6px] text-dark-blue-50 text-xs whitespace-nowrap">
          +₦10,000
        </button>

        <button className="border border-azure-blue-light/30 rounded-sm py-[9px] px-[6px] text-dark-blue-50 text-xs whitespace-nowrap">
          Max
        </button>
      </div>

      <button className="w-full bg-azure-blue-lighter text-white font-medium py-[14.5px] rounded-[5px]">
        Proceed
      </button>
    </div>
  );
};

export default BuySellPanel;
