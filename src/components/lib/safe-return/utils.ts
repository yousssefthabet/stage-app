import { toast } from "sonner";
import type {
  BackEndError,
  BackEndErrorResponse,
  BackEndErrors,
  SerializedBackEndError,
} from "./types";
import { BackEndApiError, BackEndApiErrors } from "./errors";

export function isBackEndError(value: unknown): value is BackEndError {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const val = value as Record<string, unknown>;

  return (
    typeof val.statusCode === "number" &&
    typeof val.message === "string" &&
    "error" in val &&
    typeof val.error === "string"
  );
}

export function isBackEndErrors(value: unknown): value is BackEndErrors {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const val = value as Record<string, unknown>;

  return (
    typeof val.statusCode === "number" &&
    typeof val.message === "string" &&
    "errors" in val &&
    Array.isArray(val.errors)
  );
}

export function isAnyBackEndError(
  value: unknown,
): value is BackEndErrorResponse {
  return isBackEndError(value) || isBackEndErrors(value);
}

export function serializeBackEndError(error: unknown): SerializedBackEndError {
  if (error instanceof BackEndApiError) {
    return {
      _tag: "BackEndApiError",
      statusCode: error.statusCode ?? 500,
      message: error.message,
      error: error.error ?? "Internal Server Error",
    };
  }

  if (error instanceof BackEndApiErrors) {
    return {
      _tag: "BackEndApiErrors",
      statusCode: error.statusCode ?? 400,
      message: error.message,
      errors: error.errors ?? [],
    };
  }

  return {
    _tag: "UnknownError",
    message: error instanceof Error ? error.message : "Unknown error",
  };
}

export function handleSerializedBackEndError(error: SerializedBackEndError) {
  switch (error._tag) {
    case "BackEndApiError":
      toast.error(error.message || "Une erreur est survenue.");
      break;

    case "BackEndApiErrors":
      const maxToasts = 5;
      let shown = 0;

      for (const fieldError of error.errors) {
        for (const msg of fieldError.errors) {
          if (typeof msg === "string" && shown < maxToasts) {
            toast.error(`${msg}`);
            shown++;
          }
        }
      }
      break;

    case "UnknownError":
    default:
      toast.error(error.message || "Une erreur inconnue est survenue.");
      break;
  }
}

export function handleAnyBackEndError(error: SerializedBackEndError) {
  handleSerializedBackEndError(error);
}
