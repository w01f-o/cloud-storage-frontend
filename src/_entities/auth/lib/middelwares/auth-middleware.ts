import { routing } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { ComposableMiddleware } from 'next-compose-middleware';
import { NextResponse } from 'next/server';

export const clearPathname = (pathname: string): RoutePaths => {
  const segments = pathname.split('/');
  const maybeLocale = segments[1];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (routing.locales.includes(maybeLocale)) {
    const cleanedPath = '/' + segments.slice(2).join('/');

    return (cleanedPath || RoutePaths.HOME) as RoutePaths;
  }

  return pathname as RoutePaths;
};

export const authMiddleware: ComposableMiddleware = async (req, res) => {
  const accessToken = req.cookies.get('accessToken')?.value ?? null;
  const refreshToken = req.cookies.get('refreshToken')?.value ?? null;

  const tokenIsValid = accessToken && refreshToken;

  const protectedPaths = RouterConfig.getProtectedPaths();
  const authPaths = RouterConfig.getAuthPaths();

  const pathname = clearPathname(req.nextUrl.pathname);

  if (authPaths.includes(pathname) && tokenIsValid) {
    return NextResponse.redirect(new URL(RoutePaths.HOME, req.nextUrl.origin));
  }

  if (protectedPaths.includes(pathname) && !tokenIsValid) {
    return NextResponse.redirect(
      new URL(RoutePaths.WELCOME, req.nextUrl.origin)
    );
  }

  return res;
};
