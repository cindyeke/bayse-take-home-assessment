// hooks/useEvent.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { useEventBySlug } from "@/hooks/useEventBySlug";
import { apiFetch } from "@/lib/apiclient";
import { createQueryWrapper } from "@/test-utils/queryWrapper";

jest.mock("@/lib/apiclient");

const mockEvent = {
  id: "a1b2c3d4",
  slug: "crypto-btc-1h-feb-24-11am",
  title: "Bitcoin Hourly — Feb 24 11am GMT",
  status: "open",
  markets: [{ id: "b2c3", title: "BTC above $96,250.50?" }],
};

test("fetches event by slug and returns data", async () => {
  const slug = "crypto-btc-1h-feb-24-11am";
  (apiFetch as jest.Mock).mockResolvedValueOnce(mockEvent);

  const { result } = renderHook(() => useEventBySlug(slug), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(mockEvent);
  expect(apiFetch).toHaveBeenCalledWith(
    `v1/pm/events/slug/${slug}`,
    expect.objectContaining({ signal: expect.anything() }),
  );
});

test("surfaces an error when the event is not found", async () => {
  (apiFetch as jest.Mock).mockRejectedValueOnce(new Error("Event not found"));

  const { result } = renderHook(() => useEventBySlug("bad-slug"), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isError).toBe(true));
  expect(result.current.error).toBeInstanceOf(Error);
});
