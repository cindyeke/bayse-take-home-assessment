import Accordion from "./Accordion";
import { CheckBadgeIcon as CheckBadgeSolid } from "@heroicons/react/24/solid";
import { CheckBadgeIcon as CheckBadgeOutline } from "@heroicons/react/24/outline";
import { Event } from "@/types/market";
import { formatTimelineDate } from "@/util/format";
import Skeleton from "react-loading-skeleton";

const Title = ({ label }: { label: string }) => {
  return <span className="text-[13.45px] text-dark-blue-60">{label}</span>;
};

const TimelinePayout = ({
  event,
  isLoading,
}: {
  event: Event;
  isLoading: boolean;
}) => {
  const now = new Date();
  const steps = [
    {
      title: "Market Open",
      subtitle: event?.createdAt ? formatTimelineDate(event.createdAt) : "",
      completed: !!event?.createdAt && new Date(event.createdAt) <= now,
    },
    {
      title: "Market Close",
      subtitle: event?.closingDate ? formatTimelineDate(event.closingDate) : "",
      completed: !!event?.closingDate && new Date(event.closingDate) <= now,
    },
    {
      title: "Payout",
      subtitle: "4–12 Hours After Close",
      completed: event?.status === "resolved",
    },
  ];

  return (
    <Accordion title={<Title label="Timeline & Payout" />}>
      <div className="pt-[25px] pl-6 pb-[26.7px]">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              {step.completed ? (
                <CheckBadgeSolid className="w-6 h-6 shrink-0 text-secondary-green" />
              ) : (
                <CheckBadgeOutline className="w-6 h-6 shrink-0 text-dark-blue-30" />
              )}
              {i < steps.length - 1 && (
                <div
                  className={`w-px flex-1 min-h-[49px] ${
                    step.completed ? "bg-secondary-green" : "bg-dark-blue-30"
                  }`}
                />
              )}
            </div>

            <div
              className={`text-[11.53px] ${i < steps.length - 1 ? "pb-8" : ""}`}
            >
              <p className="text-dark-blue font-semibold">{step.title}</p>
              <p
                className={`text-dark-blue-40 mt-[7.69px] ${i < steps.length - 1 ? "pb-8" : ""}`}
              >
                {isLoading ? (
                  <Skeleton width={100} height={14} borderRadius="5px" />
                ) : (
                  step.subtitle
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Accordion>
  );
};

export default TimelinePayout;
