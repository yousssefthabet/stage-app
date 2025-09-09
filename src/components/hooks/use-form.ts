"use client";

import { isAxiosError } from "axios";
import { useEffect } from "react";
import {
  type FieldValues,
  type Path,
  useForm,
  type UseFormProps,
} from "react-hook-form";

export function useFormHook<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
>(
  props?: UseFormProps<TFieldValues, TContext> & {
    error?: Error | null;
  },
) {
  const { error, ...rest } = props ?? {};

  const form = useForm<TFieldValues, TContext>({
    ...rest,
  });
  useEffect(() => {
    if (
      error &&
      isAxiosError<{
        errors: { property: string; errors: string[]; constraints: string[] }[];
      }>(error) &&
      error.status == 422
    ) {
      const fieldErrors = error.response?.data.errors ?? [];
      fieldErrors.forEach(
        (error: {
          property: string;
          errors: string[];
          constraints: string[];
        }) => {
          const fieldName = error.property;
          let errorMessage = "n/a";
          if (error.errors) {
            errorMessage = error.errors.join(", ");
          } else {
            errorMessage = Object.values(error.constraints).join(", ");
          }

          const formValues = form.getValues();
          if (formValues.hasOwnProperty(fieldName)) {
            form.setError(fieldName as Path<TFieldValues>, {
              type: "manual",
              message: errorMessage,
            });
          }
        },
      );
    }
  }, [error, form]);

  return form;
}
