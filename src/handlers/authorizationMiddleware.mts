import type { RequestHandler } from 'express';

export const authorizationMiddleware: RequestHandler = (req, res, next) => {
  next();
};
