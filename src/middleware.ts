import { ApiErrors } from '@/enums/ApiErrors.enum';
import { AuthApi, UserApi } from '@/services/api/index.api';
import { auth } from '@/services/auth/auth';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const locales = [
  'en-US',
  'ru-ru',
  'es-ES',
  'fr-FR',
  'de-DE',
  'it-IT',
  'pt-PT',
  'zh-CN',
  'ja-JP',
  'ko-KR',
  'kk-KZ',
];

function getLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale) return cookieLocale;

  const languageHeaders = {
    'accept-language': `${headers().get('accept-language')}`,
  };
  const languages = new Negotiator({ headers: languageHeaders }).languages();
  const defaultLocale = process.env.DEFAULT_LOCALE;

  if (!defaultLocale) {
    throw new Error('process.env.DEFAULT_LOCALE is not defined');
  }

  return match(languages, locales, defaultLocale);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const locale = getLocale(req);

  const sessionCookie = process.env.AUTH_URL?.startsWith('https://')
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

  const { data: userData, response: userResponse } = await UserApi.getUser();
  const session = await auth();

  if (
    session &&
    userResponse.status === 401 &&
    // @ts-expect-error
    (userData.type === ApiErrors.EXPIRED_ACCESS_TOKEN ||
      // @ts-expect-error
      userData.type === ApiErrors.WRONG_ACCESS_TOKEN)
  ) {
    const response = NextResponse.redirect(req.nextUrl);

    const oldTokenData = JSON.parse(
      req.cookies.get(sessionCookie)!.value as string
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
        secure: true,
        sameSite: 'lax',
      });
    } catch (err) {
      response.cookies.set(sessionCookie, '', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
    }

    return response;
  }

  if (session && !userData?.isActivated && !pathname.endsWith('activation')) {
    req.nextUrl.pathname = `/${locale}/activation`;

    return NextResponse.redirect(req.nextUrl);
  }

  const protectedRoutes = ['/', '/profile', '/storage', '/shared', '/settings'];

  if (
    !session &&
    protectedRoutes.includes(pathname.replace(`/${locale}`, ''))
  ) {
    req.nextUrl.pathname = `/${locale}/welcome`;
    console.log(req.nextUrl.pathname);

    return NextResponse.redirect(req.nextUrl);
  }

  if (!process.env.COOKIE_NEXT_LOCALE) {
    throw new Error('COOKIE_NEXT_LOCALE is not defined');
  }

  const urlLocale = locales.find(locale => pathname.startsWith(`/${locale}`));
  const cookieLocale = req.cookies.get(process.env.COOKIE_NEXT_LOCALE)?.value;

  if (urlLocale && urlLocale !== cookieLocale) {
    const response = NextResponse.redirect(req.nextUrl);
    response.cookies.set(process.env.COOKIE_NEXT_LOCALE, urlLocale);

    return response;
  }

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  req.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)', '/api/:path*'],
};
