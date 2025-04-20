import { withNextIntlMiddleware } from './_shared/i18n';
import { combineMiddlewares } from './_shared/lib';

export default combineMiddlewares([withNextIntlMiddleware]);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
