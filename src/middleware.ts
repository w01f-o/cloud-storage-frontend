import { composeMiddleware } from 'next-compose-middleware';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './_entities/auth';
import { nextIntlMiddleware } from './_shared/i18n';

export default async function middleware(req: NextRequest) {
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [nextIntlMiddleware, authMiddleware],
  });
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
