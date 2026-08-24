
export type ErrorVariant =
  | "network"
  | "not-found"
  | "server"
  | "forbidden"
  | "unauthorized"
  | "timeout"
  | "generic";


export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export class ApiError extends Error {
  public variant: ErrorVariant;
  public status?: number;
   public data?: ApiErrorResponse;

  constructor(
    variant: ErrorVariant,
    status?: number,
    message?: string,
    data?: ApiErrorResponse
  ) {
    super(message);

    this.variant = variant;
    this.status = status;
    this.data = data;

    // Recomendado cuando se extiende Error
    this.name = "ApiError";
  }
}