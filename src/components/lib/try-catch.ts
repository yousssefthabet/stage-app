import { serializeBackEndError } from "./safe-return/utils";
import type { SerializedBackEndError } from "./safe-return/types";

type Success<T> = { data: T; error: null };
type Failure<E> = { data: null; error: E };
type Result<T, E> = Success<T> | Failure<E>;

export async function tryCatch<T>(
  promise: Promise<T>,
  options: { serializeError: true },
): Promise<Result<T, SerializedBackEndError>>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  options?: { serializeError?: false },
): Promise<Result<T, E>>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  options?: { serializeError?: boolean },
): Promise<Result<T, E> | Result<T, SerializedBackEndError>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    if (options?.serializeError) {
      return { data: null, error: serializeBackEndError(error) };
    }
    return { data: null, error: error as E };
  }
}
