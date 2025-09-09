"use server";
import { cookies } from "next/headers";
import { getCookie, setCookie } from "cookies-next/server";
import {
  COOKIE_HTTP_ONLY,
  COOKIE_MAX_AGE,
  COOKIE_SAME_SITE,
  COOKIE_SECURE,
} from "@/constants/cookie-props";

// SETTERS
export const setAccessToken = async (accessToken: string) => {
  await setCookie("access_token", accessToken, {
    cookies,
    maxAge: COOKIE_MAX_AGE,
    httpOnly: COOKIE_HTTP_ONLY,
    secure: Boolean(COOKIE_SECURE),
    sameSite: COOKIE_SAME_SITE,
  });
};

// GETTERS
export const getAccessToken = async () => {
  const accessToken = await getCookie("access_token", { cookies });
  return accessToken ?? null;
};
