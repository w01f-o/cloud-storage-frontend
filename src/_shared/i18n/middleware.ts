import { ComposableMiddleware } from 'next-compose-middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export const nextIntlMiddleware: ComposableMiddleware = async req => {
  const middleware = createIntlMiddleware(routing);

  return middleware(req);
};
