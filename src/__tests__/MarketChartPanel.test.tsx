import { render, screen, fireEvent } from "@testing-library/react";
import MarketChartPanel from "@/components/MarketChartPanel";
import { usePriceHistory } from "@/hooks/usePriceHistory";
import type { Event, MarketOutcome } from "@/types/market";

jest.mock("@/hooks/usePriceHistory");

jest.mock("@/components/ChanceHeader", () => {
  return function MockChanceHeader() {
    return <div data-testid="chance-header" />;
  };
});

jest.mock("@/components/ChanceChart", () => {
  return function MockChanceChart() {
    return <div data-testid="chance-chart" />;
  };
});

jest.mock("@/components/MarketStats", () => {
  return function MockMarketStats() {
    return <div data-testid="market-stats" />;
  };
});

jest.mock("@/components/ChartTimeRangeSelector", () => {
  return function MockChartTimeRangeSelector({
    timePeriod,
    setTimePeriod,
  }: {
    timePeriod: string;
    setTimePeriod: (v: string) => void;
  }) {
    return (
      <div>
        <span data-testid="active-timeframe">{timePeriod}</span>
        <button onClick={() => setTimePeriod("24H")}>1D</button>
      </div>
    );
  };
});

const outcome: MarketOutcome = { id: "yes-id", label: "Yes", price: 0.55 };

const mockEvent = {
  id: "event-1",
  markets: [{ id: "market-1" }],
} as Event;

const mockPriceHistoryResponse = (points: { e: number; p: number }[]) => ({
  markets: [{ priceHistory: points }],
});

afterEach(() => jest.resetAllMocks());

test("shows loading state while the parent event hasn't resolved yet", () => {
  (usePriceHistory as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  // event without markets/id yet — simulates the parent still loading
  render(<MarketChartPanel event={{} as Event} outcome={outcome} />);

  expect(screen.getByText(/loading price history/i)).toBeInTheDocument();
  expect(screen.queryByTestId("chance-chart")).not.toBeInTheDocument();
});

test("shows loading state while the price history queries are pending", () => {
  (usePriceHistory as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    refetch: jest.fn(),
  });

  render(<MarketChartPanel event={mockEvent} outcome={outcome} />);

  expect(screen.getByText(/loading price history/i)).toBeInTheDocument();
});

test("shows an error state with a retry button that refetches both queries", () => {
  const refetchChart = jest.fn();
  const refetchDaily = jest.fn();

  (usePriceHistory as jest.Mock)
    .mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: refetchChart,
    })
    .mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: false,
      refetch: refetchDaily,
    });

  render(<MarketChartPanel event={mockEvent} outcome={outcome} />);

  expect(screen.getByText(/couldn't load price history/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /retry/i }));

  expect(refetchChart).toHaveBeenCalledTimes(1);
  expect(refetchDaily).toHaveBeenCalledTimes(1);
});

test("shows an empty state when the chart query resolves with no points", () => {
  (usePriceHistory as jest.Mock).mockReturnValue({
    data: mockPriceHistoryResponse([]),
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  render(<MarketChartPanel event={mockEvent} outcome={outcome} />);

  expect(
    screen.getByText(/no price history available yet/i),
  ).toBeInTheDocument();
});

test("renders the chart and chance header once data has loaded", () => {
  (usePriceHistory as jest.Mock).mockReturnValue({
    data: mockPriceHistoryResponse([
      { e: 1782952500000, p: 0.2765 },
      { e: 1783039128386, p: 0.49 },
    ]),
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  render(<MarketChartPanel event={mockEvent} outcome={outcome} />);

  expect(screen.getByTestId("chance-header")).toBeInTheDocument();
  expect(screen.getByTestId("chance-chart")).toBeInTheDocument();
  expect(screen.getByTestId("market-stats")).toBeInTheDocument();
});

test("always renders the timeframe selector and market stats, even while loading", () => {
  (usePriceHistory as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    refetch: jest.fn(),
  });

  render(<MarketChartPanel event={mockEvent} outcome={outcome} />);

  expect(screen.getByTestId("active-timeframe")).toBeInTheDocument();
  expect(screen.getByTestId("market-stats")).toBeInTheDocument();
});

test("clicking a timeframe button updates the selected time period", () => {
  (usePriceHistory as jest.Mock).mockReturnValue({
    data: mockPriceHistoryResponse([{ e: 1782952500000, p: 0.2765 }]),
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  render(<MarketChartPanel event={mockEvent} outcome={outcome} />);

  expect(screen.getByTestId("active-timeframe")).toHaveTextContent("1W");

  fireEvent.click(screen.getByRole("button", { name: "1D" }));

  expect(screen.getByTestId("active-timeframe")).toHaveTextContent("24H");
});
