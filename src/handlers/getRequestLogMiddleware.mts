import type { RequestHandler } from 'express';
import { inspect } from 'util';

export const getRequestLogMiddleware = (depth = 5): RequestHandler => (req, _res, next) => {
  console.log(inspect(req.body, false, depth));
  next();
};
