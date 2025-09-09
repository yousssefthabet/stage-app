"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const publicRoutes = ["/login"];

export async function requireAuth(pathname: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const isPublic = publicRoutes.some((path) => pathname == path);

  if ((!token || token == "") && !isPublic) {
    redirect("/login");
  }

  if (token && token != "" && isPublic) {
    redirect("/accueil");
  }

  if ((!token || token == "") && pathname == "/") {
    redirect("/login");
  } else if (token && token != "" && pathname == "/") {
    redirect("/accueil");
  }
}
