import Image from "next/image";

const MarketHeader = () => {
  return (
    <div className="flex flex-col gap-y-[21.64px] mb-6">
      <div className="flex pr-[28.54px] items-center justify-between">
        <div className="flex gap-x-[28.85px] items-center">
          <Image
            src="/marketimage.png"
            alt="market image"
            width={84.75}
            height={84.75}
          />
          <h1 className="text-dark-blue font-bold text-2xl">
            Will Wizkid Win A Grammy Award?
          </h1>
        </div>
        <div className="flex gap-x-[13.24px]">
          <img
            src="/icons/save.svg"
            alt="save"
            className="w-[13.82px] h-[17.94px]"
          />
          <img
            src="/icons/share.svg"
            alt="share"
            className="w-[18px] h-[18px]"
          />
        </div>
      </div>
      <div className="w-fit p-[6px] bg-secondary font-archivo text-[10px] rounded-[5px]">
        <button className="px-2 bg-white font-semibold rounded-[3px] h-[19px] text-azure-blue mr-4">
          Yes
        </button>
        <button className="font-medium h-[19px] text-dark-blue-30">No</button>
      </div>
    </div>
  );
};

export default MarketHeader;
