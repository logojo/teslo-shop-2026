import type { AxiosError } from "axios";
import { ApiError, type ApiErrorResponse } from "./api-error";

export function mapAxiosError(error: AxiosError<ApiErrorResponse>): ApiError {
  // No hubo respuesta del servidor
  if (!error.response) {
    return new ApiError("network");
  }

   const { status, data } = error.response;

  switch (status) {
    case 401:
      return new ApiError(
        "unauthorized",
        status,
        typeof data.message === "string"
          ? data.message
          : data.message.join(", "),
        data
      );

    case 403:
      return new ApiError(
        "forbidden",
        status,
        typeof data.message === "string"
          ? data.message
          : data.message.join(", "),
        data
      );

    case 404:
      return new ApiError(
        "not-found",
        status,
        typeof data.message === "string"
          ? data.message
          : data.message.join(", "),
        data
      );

    case 408:
      return new ApiError(
        "timeout",
        status,
        typeof data.message === "string"
          ? data.message
          : data.message.join(", "),
        data
      );

    default:
      if (status >= 500) {
        return new ApiError(
          "server",
          status,
          "Error interno del servidor",
          data
        );
      }

      return new ApiError(
        "generic",
        status,
        typeof data.message === "string"
          ? data.message
          : data.message.join(", "),
        data
      );
  }
}