import { type City } from "@/apis/types/city-types";

export type CityGetResponse = {
  statusCode: number;
  message: string;
  data: City[];
};
