import type { RequestHandler } from 'express';
import { z } from 'zod';

interface Body {
  secretKey: string;
}

export const getAuthorizationMiddleware = (secretKey: string): RequestHandler => (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    next();
    return;
  }

  const bodyResult = schema.safeParse(req.body);
  if (!bodyResult.success) {
    res.status(400).send(bodyResult.error.issues);
    return;
  }

  if (bodyResult.data.secretKey !== secretKey) {
    res.status(403).send({ message: 'Invalid key' });
  }

  next();
};

const schema = z.looseObject({
  secretKey: z.string().nonempty(),
}) satisfies z.ZodType<Body>;
