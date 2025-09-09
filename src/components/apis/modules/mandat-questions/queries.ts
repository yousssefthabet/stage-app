"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { mandatQuestionsKey } from "./constants";
import { type MandatQuestionsResponse } from "./types";

export const getMandatQuestions = async () => {
  const result = await customInstance<MandatQuestionsResponse>({
    url: `/mandat-questions`,
    method: "GET",
  });
  return result.data;
};

export const useMandatQuestions = () =>
  useQuery({
    queryKey: [...mandatQuestionsKey],
    queryFn: () => getMandatQuestions(),
  });
