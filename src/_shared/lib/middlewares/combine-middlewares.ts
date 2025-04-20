import { NextMiddleware, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types/middleware-factory.type';

export const combineMiddlewares = (
  callbacks: MiddlewareFactory[] = []
): NextMiddleware => {
  const createMiddleware = (index: number): NextMiddleware => {
    const current = callbacks[index];
    if (current) {
      const next = createMiddleware(index + 1);

      return current(next);
    }

    return () => NextResponse.next();
  };

  return createMiddleware(0);
};
