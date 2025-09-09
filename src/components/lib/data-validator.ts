export const validateNumber = (value: unknown): number | undefined => {
  const num = Number(value);
  return !isNaN(num) ? num : undefined;
};

export const validateString = (value: unknown): string | undefined => {
  return typeof value === "string" && value.length > 0 ? value : undefined;
};

export const validateEnum = <T extends Record<string, string | number>>(
  value: unknown,
  enumObj: T,
): T[keyof T] | undefined => {
  const enumValues = Object.values(enumObj);
  return enumValues.includes(value as T[keyof T])
    ? (value as T[keyof T])
    : undefined;
};

export const validateIncludes = <T>(value: T, array: T[]) => {
  return array.includes(value) ? value : undefined;
};

export function validateUrl(url: string) {
  try {
    new URL(url);
    return url;
  } catch {
    return undefined;
  }
}
