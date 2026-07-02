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
