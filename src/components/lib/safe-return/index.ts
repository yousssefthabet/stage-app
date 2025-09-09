import { type z, ZodError } from "zod";
import type { CustomAxiosResponse } from "./types";
import { isBackEndError, isBackEndErrors } from "./utils";
import { BackEndApiError, BackEndApiErrors } from "./errors";

/**
 * Validates and sanitizes API response data using Zod schemas
 * @template T - Expected return type (inferred from schema)
 * @param {unknown} responseData - Raw response data to validate
 * @param {z.ZodSchema<T>} schema - Zod schema for validation and type inference
 * @returns {T} Validated and sanitized data matching the schema
 * @throws {Error} Throws formatted error messages for validation failures
 *
 * @example
 * // Basic usage with simple schema
 * const data = safeReturn(apiResponse, z.string());
 *
 * @example
 * // Complex object validation
 * const userSchema = z.object({
 *   id: z.number(),
 *   name: z.string()
 * });
 * const user = safeReturn(apiResponse, userSchema);
 *
 * @example
 * // Error handling
 * try {
 *   safeReturn(invalidData, schema);
 * } catch (error) {
 *   console.error(error.message);
 * }
 *
 * @author MILED Mohamed Ameur <midou.slm8@gmail.com>
 * @created 04/04/2025
 */

export async function safeReturn<T>(
  fn: () => Promise<CustomAxiosResponse<T>>,
  schema: z.ZodSchema<T>,
): Promise<CustomAxiosResponse<T>> {
  const response = await fn();

  const responseData = response;

  if (isBackEndError(responseData)) {
    throw new BackEndApiError(responseData);
  }

  if (isBackEndErrors(responseData)) {
    throw new BackEndApiErrors(responseData);
  }

  const actualData = responseData.data.data;

  try {
    schema.parse(actualData);
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetails = error.errors.map((issue) => {
        const path =
          issue.path.length > 0
            ? `Field '${issue.path.join(".")}'`
            : "Root level";
        return `${path}: ${issue.message}`;
      });

      throw new Error(`Validation failed:\n${errorDetails.join("\n")}`);
    }

    if (error instanceof SyntaxError) {
      throw new Error("Invalid JSON structure");
    }

    throw new Error(
      error instanceof Error ? error.message : "Unknown data processing error",
    );
  }
}
