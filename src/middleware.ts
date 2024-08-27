import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/services/auth/auth";
import Negotiator from "negotiator";
import { AuthApi } from "@/services/auth/auth.api";

const locales = ["en-US", "ru-ru", "kk-KZ"];

function getLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;

  if (cookieLocale) return cookieLocale;

  let headers = { "accept-language": "en-US,en;q=0.5" };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = process.env.DEFAULT_LOCALE;

  if (!defaultLocale) {
    throw new Error("defaultLocale is not defined");
  }

  return defaultLocale;
  // return match(languages, locales, defaultLocale);
}

// TODO: REFACTORING ALL NAHUI

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
    ? "__Secure-next-auth.session-token"
    : "authjs.session-token";
  const session = await auth();

  if (session && session.user.accessExpiresAt < Date.now()) {
    const response = NextResponse.redirect(req.nextUrl);

    console.log("Token expired");
    const oldTokenData = JSON.parse(
      req.cookies.get(sessionCookie)?.value as string,
    );
    const {
      data: { accessToken, refreshToken },
    } = await AuthApi.refresh(oldTokenData.refreshToken);
    const newSession = {
      ...oldTokenData,
      accessToken,
      refreshToken,
      accessExpiresAt: Date.now() + 1000 * 10,
      refreshExpiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
    };

    await new Promise((resolve) => setTimeout(resolve, 100));
    response.cookies.set(sessionCookie, JSON.stringify(newSession));

    return response;
  }

  const urlLocale = locales.find((locale) => pathname.startsWith(`/${locale}`));
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;

  if (urlLocale && urlLocale !== cookieLocale) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", urlLocale);

    return response;
  }

  const locale = getLocale(req);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  req.nextUrl.pathname = `/${locale}${pathname}`;
  const protectedRoutes = ["/", "/profile", "/storage", "/shared", "/settings"];
  if (!session && protectedRoutes.includes(pathname)) {
    req.nextUrl.pathname = `/${locale}/welcome`;
  }

  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
