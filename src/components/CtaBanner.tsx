import Image from "next/image";

const CtaBanner = () => {
  return (
    <div className="absolute z-10 px-[90px] h-[417px] w-full">
      <div className="bg-light-blue-10 rounded-3xl px-[150px] py-[80px] flex items-center justify-between">
        <div className="w-[408px]">
          <h2 className="text-[32px] font-bold text-dark-blue-80 mb-10">
            Your knowledge should pay, you're early, join the movement.
          </h2>
          <button
            type="button"
            className="rounded-[37.27px] bg-azure-blue px-6 py-3 text-[15.35px] font-semibold leading-[26.31px] text-white"
          >
            Start trading now
          </button>
        </div>
        <div className="w-[257px] h-[257px] rounded-[25.96px] border-[10.08px] border-light-blue-20 p-[12.60px]">
          <Image
            src="/qrcode.png"
            alt="Scan to start trading on mobile"
            width={213.93}
            height={213.93}
          />
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
