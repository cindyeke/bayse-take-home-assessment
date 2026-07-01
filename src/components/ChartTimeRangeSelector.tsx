const ChartTimeRangeSelector = () => {
  return (
    <div className="flex items-center justify-center border border-dark-blue-5 rounded-[2.47px] px-[18.03px] h-[44.18px] w-fit gap-x-[21.64px] text-dark-blue-30 text-[12.62px] mb-6">
      <button>All</button>
      <button>1M</button>
      <button className="text-white font-bold py-[3.61px] px-[5.41px] bg-dark-blue rounded-[3.61px]">
        1W
      </button>
      <button>1D</button>
      <button>12H</button>
    </div>
  );
};

export default ChartTimeRangeSelector;
