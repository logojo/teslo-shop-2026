
export type ErrorVariant =
  | "network"
  | "not-found"
  | "server"
  | "forbidden"
  | "unauthorized"
  | "timeout"
  | "generic";

export class ApiError extends Error {
  public variant: ErrorVariant;
  public status?: number;

  constructor(
    variant: ErrorVariant,
    status?: number,
    message?: string
  ) {
    super(message);

    this.variant = variant;
    this.status = status;

    // Recomendado cuando se extiende Error
    this.name = "ApiError";
  }
}