import cookie from "cookie";
import { NextApiResponse } from "next";

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  maxAge?: number;
}

export function setCookie(
  res: NextApiResponse, 
  name: string, 
  value: string | object, 
  options: CookieOptions = {}
) {
  const stringValue = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);
  const optionsWithDefaults: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...options,
  };
  res.setHeader("Set-Cookie", cookie.serialize(name, stringValue, optionsWithDefaults));
}

export function getCookie(req: any, name: string): string | undefined {
  const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  return cookies[name];
}

export function removeCookie(res: NextApiResponse | null, name: string, options: CookieOptions = {}) {
  if (res) {
    setCookie(res, name, "", { ...options, maxAge: -1 });
  } else {
    // Supprimer le cookie côté client
    document.cookie = cookie.serialize(name, "", {
      ...options,
      maxAge: -1,
      path: "/",
    });
  }
}
