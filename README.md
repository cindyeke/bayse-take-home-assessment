# Bayse — Market Detail Page (Take-Home Assessment)

**Live route:** `/[slug]` — the home page redirects to a sample market:

```
/will-goodluck-jonathan-contest-the-2027-presidential-election
```

---

## Tech stack

| Layer          | Choice                                                                     |
| -------------- | -------------------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router)                                                    |
| UI             | React 19, TypeScript, Tailwind CSS v4                                      |
| Data fetching  | TanStack Query v5                                                          |
| Charts         | [lightweight-charts](https://tradingview.github.io/lightweight-charts/) v4 |
| Icons          | Heroicons                                                                  |
| Loading states | react-loading-skeleton                                                     |
| Testing        | Jest, React Testing Library, ts-jest                                       |

**API:** `https://relay.bayse.markets/`

---

## Getting started

**Requirements:** Node.js 20+ and npm.

From the project root, run:

```bash
npm install && npm run dev
```

That installs dependencies and starts the dev server in one step. Open [http://localhost:3000](http://localhost:3000) — you’ll be redirected to the sample market slug above.

No `.env` file or extra setup is required.

**Other scripts:**

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint (Next.js config)
npm test        # Run unit tests (Jest)
```

---

## Running tests

Tests use **Jest** with **React Testing Library**, configured via `jest.config.ts` and `jest.setup.ts` (Next.js `next/jest` preset, jsdom environment).

```bash
npm install && npm test
```

(Run `npm install` first if you haven’t already — the same install step as above also pulls in Jest.)

**What’s covered:**

| File                                      | Focus                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `src/__tests__/useEvent.test.tsx`         | `useEventBySlug` — success and error paths                                |
| `src/__tests__/MarketChartPanel.test.tsx` | Loading, error/retry, empty, and loaded chart states; timeframe switching |
| `src/__tests__/OrderBookPanel.test.tsx`   | Loading, error/retry, empty, success, outcome toggle                      |
| `src/__tests__/OrderBookRow.test.tsx`     | Bid/ask row formatting, colours, depth bar width                          |

API calls and child chart components are mocked where needed so tests stay fast and deterministic. Shared test helpers live in `src/test-utils/`.

---

## Project structure

```
src/
├── app/
│   ├── [slug]/page.tsx    # Market detail page shell
│   ├── page.tsx           # Redirects to default slug
│   └── layout.tsx         # Fonts + global styles
├── components/            # Page sections (chart, order book, header, etc.)
├── hooks/                 # TanStack Query hooks for API data
├── lib/                   # API client, query keys, chart/orderbook helpers
├── types/                 # Event, Market, order book, price history types
├── util/                  # Date/price formatting
└── __tests__/             # Unit tests
```

**Data flow (simplified):**

```
/[slug] → useEventBySlug(slug) → MarketDetailGrid
                                      ├── MarketChartPanel → usePriceHistory
                                      ├── OrderBookPanel   → useOrderBook
                                      └── TimelinePayout, MarketSummary, …
```

---

## Design decisions

### Layout & composition

- **`MarketDetailGrid`** is the orchestrator: it reads the slug from the URL, fetches the event, and owns **selected outcome** state (Yes/No) so the chart, header, and order book stay in sync.
- The page follows the design’s two-column grid: main content (~757px) + buy/sell sidebar.
- Reusable **`Accordion`** wraps collapsible sections (timeline, market rules).

### Data fetching

- **TanStack Query** for caching, loading/error states, and refetch. Query keys live in `src/lib/querykeys.ts`.
- A thin **`apiFetch`** wrapper (`src/lib/apiclient.ts`) centralises the base URL and error normalisation.
- **`staleTime: 5 minutes`** on the event query to avoid refetching on every navigation.

### Chart

- **lightweight-charts v4** (not v5) — v5 changed the series API and broke `addLineSeries` in the version I first tried.
- **`autoSize: true`** so the chart resizes with its container instead of manual `ResizeObserver` logic.
- **Two price-history queries** in `MarketChartPanel`: one for the selected time range (chart) and one fixed at `24H` (daily change in `ChanceHeader`).
- Custom **tick formatter** for axis labels (`Nov 1` style).

### Styling & typography

- Design tokens (colours, borders) in `globals.css` via Tailwind v4 `@theme`.
- **Onest** as the default sans via `next/font/google`. **Inter** and **Archivo** are loaded for specific UI areas.
- The design specifies **Pitanga**; I did not bundle it because it’s a commercial/trial font and wasn’t included in the repo. Google Fonts substitutes are used instead.

### UX details

- **Skeleton loaders** while event/chart/order book data loads.
- **Error + retry** on the market header when the event fetch fails.
- **Buy/sell panel** is interactive UI only (amount input, presets) — no order submission API was in scope.

### What I deliberately kept simple

- **`QueryClientProvider`** is instantiated in the page component rather than a shared app-level provider — fine for a single route, would refactor for a multi-page app.
- **`BuySellPanel`** and **`RelatedMarkets`** are mostly presentational.
- **`useTicker`** and **`useTrades`** hooks exist but are unused — placeholders if live trade tape were needed. It didn't seem to me that this figma UI expected data from the trades endpoint as I couldnt map API data to static data on figma UI.

---

## Assumptions & known gaps

These are places where the design showed data I could not confidently map to the API (or where no endpoint was obvious) within the assessment window.

| UI element                              | Current behaviour                        | Notes                                                                                                                                                                                                                                                                   |
| --------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Liquidity (`200K`)** in `MarketStats` | Hardcoded `200K`                         | The `Event` type includes a `liquidity` field, but I wasn’t sure how the API value should be formatted (compact `200K` vs full currency) or whether it matched the design’s “liquidity” stat. `totalOrders` and `closingDate` are wired from the API.                   |
| **Payout step** in `TimelinePayout`     | Subtitle: `"4–12 Hours After Close"`     | Market open/close use `createdAt` and `closingDate`. The API exposes `resolutionDate` and `status`, but I didn’t confirm the payout copy or timing rules from the API, so the payout subtitle is static design copy. Completion still keys off `status === "resolved"`. |
| **Related markets**                     | Static mock list in `RelatedMarkets.tsx` | No related-events endpoint was documented or discovered; the section matches the design with placeholder data.                                                                                                                                                          |

---

## What I’d improve with more time

1. **Reusability** — extract more shared primitives (e.g. async state wrapper for loading/error/empty/retry, section headings, outcome toggles) and consolidate repeated patterns across panels instead of duplicating similar markup and state handling in each component.
2. **Prettier** — add Prettier + `eslint-config-prettier`, format-on-save, and a `npm run format` script. I relied on ESLint only during the take-home.
3. **Wire remaining API fields** — format `event.liquidity` for `MarketStats`, use `resolutionDate` (or a dedicated payout field) for the timeline payout step, and hook up related markets if an endpoint exists.
4. **Shared React Query provider** — move `QueryClientProvider` to a root `providers.tsx` with sensible defaults (devtools in dev, global error handling).
5. **Broader test coverage** — integration tests for `MarketDetailGrid`, snapshot for static sections, and E2E with Playwright for the full page flow.
6. **Buy/sell** — validate input.
7. **Accessibility** — keyboard support for outcome toggle and accordions, focus management, and aria labels on icon-only controls.

---

## Notes for reviewers

- **Quick start:** `npm install && npm run dev`, then open [http://localhost:3000](http://localhost:3000).
- Swap the slug in the URL to load another event (if it exists in the API).
- `npm run build` should complete successfully with network access for any runtime fetches during static analysis.
- `npm test` for unit tests (after `npm install`); `npm run lint` for ESLint.

Thanks for reviewing!
