export interface ApiErrorBody {
  error: string;
  message: string;
  statusCode: number;
}

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorCode: string;

  constructor(body: ApiErrorBody) {
    super(body.message);
    this.name = "ApiError";
    this.statusCode = body.statusCode;
    this.errorCode = body.error;
  }
}

export async function normalizeApiError(response: Response): Promise<ApiError> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    return new ApiError(body);
  } catch {
    return new ApiError({
      error: "unknown_error",
      message: response.statusText || "Something went wrong",
      statusCode: response.status,
    });
  }
}
