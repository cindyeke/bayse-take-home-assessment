import Accordion from "../Accordion";

const Title = ({ title }: { title: string }) => {
  return (
    <span className="flex gap-x-[6px]">
      {title}
      <img src="/icons/roundquestionmark.svg" alt="questionmark" />
    </span>
  );
};

function OrderBookPanel() {
  return (
    <Accordion title={<Title title="Order Book" />}>
      <div className="flex flex-col gap-x-2 pt-[19px] pl-[18px] mb-[3.85px]">
        <div className="flex gap-x-2 font-onest">
          <button className="text-[13px] font-medium text-azure-blue border border-azure-blue bg-light-blue-30 py-[6.5px] px-[14px] rounded-[5px]">
            Yes Offers
          </button>
          <button className="text-xs font-medium border border-dark-blue-10 text-dark-blue-80 py-[6.5px] px-[14px] rounded-[5px]">
            No Offers
          </button>
        </div>
      </div>
    </Accordion>
  );
}

export default OrderBookPanel;
