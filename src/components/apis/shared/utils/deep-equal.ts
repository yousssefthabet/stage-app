export function deepEqual(a: unknown, b: unknown): boolean {
  const normalize = (val: unknown): unknown => {
    if (val == null) return val;
    if (val instanceof Date) return val.toISOString().split("T")[0];
    if (typeof val === "string") {
      // Only normalize ISO-like date strings
      const match = /^\d{4}-\d{2}-\d{2}/.exec(val);
      if (match) return match[0];
    }
    return val;
  };

  a = normalize(a);
  b = normalize(b);

  if (a == b) return true;

  if (typeof a != "object" || a == null || typeof b != "object" || b == null) {
    return false;
  }

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => {
    if (!keysB.includes(key)) return false;
    return deepEqual(objA[key], objB[key]);
  });
}
