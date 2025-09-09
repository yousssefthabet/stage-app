import { deepEqual } from "./deep-equal";

export function getChangedFields<T extends object>(
  original: T,
  current: T,
): Partial<T> {
  const changed: Partial<T> = {};

  for (const key in current) {
    if (
      Object.prototype.hasOwnProperty.call(current, key) &&
      !deepEqual(current[key], original[key])
    ) {
      changed[key] = current[key];
    }
  }

  return changed;
}
