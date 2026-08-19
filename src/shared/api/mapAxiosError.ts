import type { AxiosError } from "axios";
import { ApiError } from "./api-error";

export function mapAxiosError(error: AxiosError): ApiError {
  // No hubo respuesta del servidor
  if (!error.response) {
    return new ApiError("network");
  }

  switch (error.response.status) {
    case 401:
      return new ApiError("unauthorized", 401);

    case 403:
      return new ApiError("forbidden", 403);

    case 404:
      return new ApiError("not-found", 404);

    case 408:
      return new ApiError("timeout", 408);

    default:
      if (error.response.status >= 500) {
        return new ApiError("server", error.response.status);
      }

      return new ApiError("generic", error.response.status);
  }
}