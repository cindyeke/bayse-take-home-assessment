import { Dispatch, SetStateAction } from "react";
import { TimePeriod } from "@/types/pricehistory";

const timePeriods = [
  { label: "All", value: "1Y" },
  { label: "1M", value: "1M" },
  { label: "1W", value: "1W" },
  { label: "1D", value: "24H" },
  { label: "12H", value: "12H" },
];

const ChartTimeRangeSelector = ({
  timePeriod: selectedTimePeriod,
  setTimePeriod,
}: {
  timePeriod: TimePeriod;
  setTimePeriod: Dispatch<SetStateAction<TimePeriod>>;
}) => {
  return (
    <div className="flex items-center justify-center border border-dark-blue-5 rounded-[2.47px] px-[18.03px] h-[44.18px] w-fit gap-x-[21.64px] text-dark-blue-30 text-[12.62px] mb-6">
      {timePeriods.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setTimePeriod(value as TimePeriod)}
          className={
            value === selectedTimePeriod
              ? "text-white font-bold py-[3.61px] px-[5.41px] bg-dark-blue rounded-[3.61px]"
              : ""
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChartTimeRangeSelector;
