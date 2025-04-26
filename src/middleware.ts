import { authMiddleware } from '@/_entities/auth';
import { nextIntlMiddleware } from '@/_shared/i18n';
import { combineMiddlewares } from '@/_shared/lib';

export default combineMiddlewares([authMiddleware, nextIntlMiddleware]);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
