import { MiddlewareFactory } from '@/_shared/lib';

export const authMiddleware: MiddlewareFactory = next => {
  return (req, res) => {
    next(req, res);
  };
};
