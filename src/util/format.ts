export const formatPrice = (price: number): string => {
  const scaled = price * 100;
  return scaled.toFixed(1);
};

export const formatAmount = (amount: number): string => {
  return `${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatTimelineDate = (date: string | Date) => {
  const d = new Date(date);
  const day = d.getDate();

  return `${day}${getOrdinalSuffix(day)} of ${d.toLocaleString("en-US", {
    month: "long",
  })}, ${d.getFullYear()}`;
};
