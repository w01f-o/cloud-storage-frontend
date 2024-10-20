import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/services/auth/auth";
import Negotiator from "negotiator";
import { AuthApi, UserApi } from "@/services/api/index.api";
import { match } from "@formatjs/intl-localematcher";
import { headers } from "next/headers";

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

  const languageHeaders = {
    "accept-language": `${headers().get("accept-language")}`,
  };
  const languages = new Negotiator({ headers: languageHeaders }).languages();
  const defaultLocale = process.env.DEFAULT_LOCALE;

  if (!defaultLocale) {
    throw new Error("process.env.DEFAULT_LOCALE is not defined");
  }

  return match(languages, locales, defaultLocale);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
    ? "__Secure-next-auth.session-token"
    : "authjs.session-token";
  const session = await auth();

  const locale = getLocale(req);

  if (session && session.user.refreshExpiresIn < Date.now()) {
    const response = NextResponse.redirect(req.nextUrl);

    response.cookies.delete(sessionCookie);

    return response;
  }

  if (session && session.user.accessExpiresIn < Date.now()) {
    const response = NextResponse.redirect(req.nextUrl);

    if (process.env.NODE_ENV === "development") {
      console.log("Token expired");
    }

    const oldTokenData = JSON.parse(
      req.cookies.get(sessionCookie)?.value as string,
    );
    try {
      const {
        data: {
          tokens: { access, refresh, accessExpiresIn, refreshExpiresIn },
        },
      } = await AuthApi.refresh(oldTokenData.refreshToken);
      const newSession = {
        ...oldTokenData,
        accessToken: access,
        refreshToken: refresh,
        accessExpiresIn,
        refreshExpiresIn,
      };

      response.cookies.set(sessionCookie, JSON.stringify(newSession), {
        httpOnly: true,
      });
    } catch (err) {
      response.cookies.delete(sessionCookie);
    }

    return response;
  }

  const { data: user } = await UserApi.getUser();

  if (session && !user?.isActivated && !pathname.endsWith("activation")) {
    req.nextUrl.pathname = `/${locale}/activation`;

    return NextResponse.redirect(req.nextUrl);
  }

  if (!process.env.COOKIE_NEXT_LOCALE) {
    throw new Error("COOKIE_NEXT_LOCALE is not defined");
  }

  const urlLocale = locales.find((locale) => pathname.startsWith(`/${locale}`));
  const cookieLocale = req.cookies.get(process.env.COOKIE_NEXT_LOCALE)?.value;

  if (urlLocale && urlLocale !== cookieLocale) {
    const response = NextResponse.redirect(req.nextUrl);
    response.cookies.set(process.env.COOKIE_NEXT_LOCALE, urlLocale);

    return response;
  }

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
  matcher: ["/((?!_next|favicon.ico).*)", "/api/:path*"],
};
