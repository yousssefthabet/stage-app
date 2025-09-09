"use client";
import { useDeleteCookie, useGetCookie, setCookie } from "cookies-next";

import { useCallback, useMemo } from "react";

export const useSession = () => {
  const getCookie = useGetCookie();

  const token = useMemo(() => getCookie("access_token"), [getCookie]);
  return token;
};

export const useSetSession = () => {
  //  const setCookie = useSetCookie();

  const setSession = useCallback(async (accessToken: string) => {
    await setCookie("access_token", accessToken, {
      // maxAge: COOKIE_MAX_AGE, // en secondes
      httpOnly: false, // toujours true en prod pour éviter l'accès JS
      secure: false, // true en HTTPS (prod)
      sameSite: "lax", // ou "strict" si tu ne veux aucun partage intersite
      path: "/", // garantit que le cookie est envoyé sur tout le site
      maxAge: 60 * 60 * 24 * 30,
    });
    // setCookie("access_token", accessToken, {
    //   maxAge: COOKIE_MAX_AGE,
    //   httpOnly: COOKIE_HTTP_ONLY,
    //   secure: Boolean(COOKIE_SECURE),
    //   sameSite: COOKIE_SAME_SITE,
    // });
  }, []);

  return setSession;
};

export const useDeleteSession = () => {
  const deleteCookie = useDeleteCookie();

  const deleteSession = useCallback(() => {
    deleteCookie("access_token");
  }, [deleteCookie]);

  return deleteSession;
};
