import type { RequestHandler } from 'express';
import { z } from 'zod';

interface Body {
  secret_key: string;
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

  if (bodyResult.data.secret_key !== secretKey) {
    res.status(403).send({ message: 'Invalid key' });
  }

  next();
};

const schema = z.looseObject({
  // eslint-disable-next-line camelcase
  secret_key: z.string().nonempty(),
}) satisfies z.ZodType<Body>;
