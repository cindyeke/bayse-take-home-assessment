import { render, screen, fireEvent } from "@testing-library/react";
import OrderBookPanel from "@/components/OrderBookPanel/OrderBookPanel";
import { useOrderBook } from "@/hooks/useOrderBook";
import type { MarketOutcome } from "@/types/market";

jest.mock("@/hooks/useOrderBook");

const outcome1: MarketOutcome = { id: "yes-id", label: "Yes", price: 0.55 };
const outcome2: MarketOutcome = { id: "no-id", label: "No", price: 0.45 };

const mockSnapshot = {
  outcomeId: "yes-id",
  bids: [{ price: 0.088, quantity: 0.63, total: 0.05544 }],
  asks: [{ price: 0.135, quantity: 1.17, total: 0.15795 }],
  lastTradedPrice: 0.085,
  lastTradedSide: "SELL" as const,
};

afterEach(() => jest.resetAllMocks());

test("shows a loading state while fetching", () => {
  (useOrderBook as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    refetch: jest.fn(),
  });

  render(<OrderBookPanel outcome1={outcome1} outcome2={outcome2} />);

  expect(screen.getByText(/loading order book/i)).toBeInTheDocument();
});

test("shows an error state with a working retry button", () => {
  const refetch = jest.fn();
  (useOrderBook as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    refetch,
  });

  render(<OrderBookPanel outcome1={outcome1} outcome2={outcome2} />);

  expect(screen.getByText(/couldn't load the order book/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /retry/i }));
  expect(refetch).toHaveBeenCalledTimes(1);
});

test("shows an empty state when the selected outcome has no bids or asks", () => {
  (useOrderBook as jest.Mock).mockReturnValue({
    data: [{ ...mockSnapshot, bids: [], asks: [] }],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  render(<OrderBookPanel outcome1={outcome1} outcome2={outcome2} />);

  expect(
    screen.getByText(/no open orders for this market yet/i),
  ).toBeInTheDocument();
});

test("renders bid and ask rows, last traded price, and spread on success", () => {
  (useOrderBook as jest.Mock).mockReturnValue({
    data: [mockSnapshot],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  render(<OrderBookPanel outcome1={outcome1} outcome2={outcome2} />);

  expect(screen.getByText(/order book/i)).toBeInTheDocument();
  expect(screen.getByText(/last traded price/i)).toBeInTheDocument();
  expect(screen.getByText(/spread/i)).toBeInTheDocument();
});

test("switches to the second outcome's order book when its toggle is clicked", () => {
  const secondSnapshot = {
    ...mockSnapshot,
    outcomeId: "no-id",
    lastTradedPrice: 0.42,
    lastTradedSide: "BUY" as const,
  };

  (useOrderBook as jest.Mock).mockReturnValue({
    data: [mockSnapshot, secondSnapshot],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  render(<OrderBookPanel outcome1={outcome1} outcome2={outcome2} />);

  fireEvent.click(screen.getByRole("button", { name: /no offers/i }));

  const lastTradedText = screen.getByText(/last traded price/i).textContent;
  expect(lastTradedText).toContain("42.0");
  expect(lastTradedText).toContain("buy");
});
