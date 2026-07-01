const ChanceHeader = () => {
  return (
    <div className="h-11 flex justify-between items-center">
      <div className="flex items-center gap-x-[10.82px]">
        <div className="flex flex-col leading-[100%]">
          <span className="font-bold text-2xl text-azure-blue">51%</span>
          <span className="font-medium text-[9.02px] tracking-[30%] text-azure-blue-light">
            CHANCE
          </span>
        </div>
        <div className="flex items-center gap-x-[4.51px] text-secondary-red font-archivo text-[14px]">
          <img
            src="/icons/arrowdown.svg"
            alt="arrowdown"
            className="w-[6.32px] h-[8.93px]"
          />
          <span className="font-semibold">2%</span>
          <span className="text-dark-blue-80">today</span>
        </div>
      </div>
      <img
        src="/icons/bayse.svg"
        className="w-[123.19px] h-[30.16px]"
        alt="bayse"
      />
    </div>
  );
};

export default ChanceHeader;
