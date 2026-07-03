import { normalizeApiError } from "./apierror";

const BASE_URL = "https://relay.bayse.markets/";

interface RequestOptions {
  signal?: AbortSignal;
}

export async function apiFetch<T>(
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    signal: options?.signal,
  });

  if (!response.ok) {
    throw await normalizeApiError(response);
  }

  return response.json() as Promise<T>;
}
