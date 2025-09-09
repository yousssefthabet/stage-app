// --- Helper to remove empty fields ---
export function removeEmpty<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    const value = obj[key];
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result[key] = value;
    }
  }
  return result;
}
