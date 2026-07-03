import { render, screen } from "@testing-library/react";
import OrderBookRow from "@/components/OrderBookPanel/OrderBookRow";
import type { DepthLevel } from "@/types/orderbook";

const level: DepthLevel = {
  price: 0.088,
  quantity: 8.64,
  total: 76.03,
  depthPercent: 45,
};

function getByTextContent(text: string) {
  return screen.getByText((_, element) => element?.textContent === text);
}

test("renders formatted price, quantity, and total for an ask row", () => {
  render(<OrderBookRow level={level} side="ask" />);

  expect(getByTextContent("₦8.8")).toBeInTheDocument();
  expect(screen.getByText("8.64")).toBeInTheDocument();
  expect(getByTextContent("₦76.03")).toBeInTheDocument();
});

test("renders formatted price, quantity, and total for a bid row", () => {
  render(<OrderBookRow level={level} side="bid" />);

  expect(getByTextContent("₦8.8")).toBeInTheDocument();
  expect(screen.getByText("8.64")).toBeInTheDocument();
  expect(getByTextContent("₦76.03")).toBeInTheDocument();
});

test("applies ask/bid-specific color classes to the price", () => {
  const { rerender } = render(<OrderBookRow level={level} side="ask" />);
  expect(getByTextContent("₦8.8")).toHaveClass("text-secondary-red");

  rerender(<OrderBookRow level={level} side="bid" />);
  expect(getByTextContent("₦8.8")).toHaveClass("text-secondary-green");
});

test("sets the depth bar width from depthPercent", () => {
  const { container } = render(<OrderBookRow level={level} side="ask" />);
  const depthBar = container.querySelector('[aria-hidden="true"]');
  expect(depthBar).toHaveStyle({ width: "45%" });
});

test("sets the depth bar width from depthPercent", () => {
  const { container } = render(<OrderBookRow level={level} side="ask" />);
  const depthBar = container.querySelector('[aria-hidden="true"]');
  expect(depthBar).toHaveStyle({ width: "45%" });
});
