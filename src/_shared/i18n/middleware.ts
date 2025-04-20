import createIntlMiddleware from 'next-intl/middleware';
import { MiddlewareFactory } from '../lib';
import { routing } from './routing';

export const withNextIntlMiddleware: MiddlewareFactory = () => {
  const intlMiddleware = createIntlMiddleware(routing);

  return req => {
    return intlMiddleware(req);
  };
};
