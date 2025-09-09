import type { ApplicationProjectCostRequest } from "../types/application-project-cost-request.type";
import { keyMap } from "./key-map";

type KeyMap = Record<
  string,
  | keyof ApplicationProjectCostRequest
  | Array<keyof ApplicationProjectCostRequest>
>;

export const mapFormToProjectCostRequest = (
  form: Record<string, unknown>,
): ApplicationProjectCostRequest => {
  // Use unknown for properties to avoid TS error on assignment
  const result: Partial<Record<keyof ApplicationProjectCostRequest, unknown>> =
    {};

  const typedKeyMap = keyMap as KeyMap;

  for (const formKey in typedKeyMap) {
    const apiKey = typedKeyMap[formKey];
    if (!apiKey) continue;

    const rawValue = form[formKey];

    if (rawValue === undefined || rawValue === "") continue;

    const value =
      typeof rawValue === "string" && rawValue.trim() !== ""
        ? Number(rawValue)
        : rawValue;

    if (Array.isArray(apiKey)) {
      for (const key of apiKey) {
        if (result[key] === undefined) {
          result[key] = value;
        }
      }
    } else {
      result[apiKey] = value;
    }
  }

  result.courtageManually = false;

  return result as ApplicationProjectCostRequest;
};
