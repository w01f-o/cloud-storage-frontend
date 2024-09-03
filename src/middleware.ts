import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/services/auth/auth";
import Negotiator from "negotiator";
import { AuthApi } from "@/services/api/index.api";

const locales = [
  "en-US",
  "ru-ru",
  "es-ES",
  "fr-FR",
  "de-DE",
  "it-IT",
  "pt-PT",
  "zh-CN",
  "ja-JP",
  "ko-KR",
  "kk-KZ",
];

function getLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;

  if (cookieLocale) return cookieLocale;

  let headers = { "accept-language": "en-US,en;q=0.5" };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = process.env.DEFAULT_LOCALE;

  if (!defaultLocale) {
    throw new Error("process.env.DEFAULT_LOCALE is not defined");
  }

  return defaultLocale;
  // return match(languages, locales, defaultLocale);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
    ? "__Secure-next-auth.session-token"
    : "authjs.session-token";
  const session = await auth();

  if (session && session.user.accessExpiresIn < Date.now()) {
    const response = NextResponse.redirect(req.nextUrl);

    if (process.env.NODE_ENV === "development") {
      console.log("Token expired");
    }

    const oldTokenData = JSON.parse(
      req.cookies.get(sessionCookie)?.value as string,
    );
    const {
      data: { accessToken, refreshToken, accessExpiresIn, refreshExpiresIn },
    } = await AuthApi.refresh(oldTokenData.refreshToken);
    const newSession = {
      ...oldTokenData,
      accessToken,
      refreshToken,
      accessExpiresIn,
      refreshExpiresIn,
    };

    response.cookies.set(sessionCookie, JSON.stringify(newSession), {
      httpOnly: true,
    });

    return response;
  }

  if (!process.env.COOKIE_NEXT_LOCALE) {
    throw new Error("COOKIE_NEXT_LOCALE is not defined");
  }

  const urlLocale = locales.find((locale) => pathname.startsWith(`/${locale}`));
  const cookieLocale = req.cookies.get(process.env.COOKIE_NEXT_LOCALE)?.value;

  if (urlLocale && urlLocale !== cookieLocale) {
    const response = NextResponse.next();
    response.cookies.set(process.env.COOKIE_NEXT_LOCALE, urlLocale);

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
  matcher: ["/((?!_next).*)", "/api/:path*"],
};
