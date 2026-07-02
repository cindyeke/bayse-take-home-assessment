export const formatPrice = (price: number): string => {
  const scaled = price * 100;
  return scaled.toFixed(1);
};
