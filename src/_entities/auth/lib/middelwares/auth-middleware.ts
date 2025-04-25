import { MiddlewareFactory } from '@/_shared/lib';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { getLocale } from 'next-intl/server';
import { NextResponse } from 'next/server';

const clearPathname = async (pathname: string): Promise<RoutePaths> => {
  const locale = await getLocale();

  if (pathname.startsWith(`/${locale}`)) {
    return (pathname.slice(locale.length + 1) || RoutePaths.HOME) as RoutePaths;
  }

  return pathname as RoutePaths;
};

export const authMiddleware: MiddlewareFactory = next => {
  return async (req, res) => {
    const accessToken = req.cookies.get('accessToken')?.value ?? null;
    const refreshToken = req.cookies.get('refreshToken')?.value ?? null;

    const tokenIsValid = accessToken && refreshToken;

    const protectedPaths = RouterConfig.getProtectedPaths();
    const authPaths = RouterConfig.getAuthPaths();

    const pathname = await clearPathname(req.nextUrl.pathname);

    if (authPaths.includes(pathname) && tokenIsValid) {
      return NextResponse.redirect(
        new URL(RoutePaths.HOME, req.nextUrl.origin)
      );
    }

    if (protectedPaths.includes(pathname) && !tokenIsValid) {
      return NextResponse.redirect(
        new URL(RoutePaths.WELCOME, req.nextUrl.origin)
      );
    }

    return next(req, res);
  };
};
