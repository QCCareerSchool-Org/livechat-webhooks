import type { RequestHandler } from 'express';

import { verifySignature } from '#lib/verifySignature.mjs';

export const getAuthorizationMiddleware = (headerName: string, secretKey: string): RequestHandler => (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    next();
    return;
  }

  if (req.method === 'GET') {
    next();
    return;
  }

  const header = req.headers[headerName];

  if (!header) {
    console.error(`${headerName} header not found`);
    res.status(400).send(`${headerName} header not found`);
    return;
  }

  if (Array.isArray(header)) {
    console.error(`${headerName} header is not a string`);
    res.status(400).send(`${headerName} header is not a string`);
    return;
  }

  const matches = /^sha256=([0-9a-f]{64})+$/u.exec(header);

  if (matches === null || matches.length === 0) {
    console.log(`${headerName} header has an invalid format`);
    res.status(400).send(`${headerName} header has an invalid format`);
    return;
  }

  const signature = matches[1];
  if (typeof signature === 'undefined') {
    throw Error('undefined signature');
  }

  if (!req.rawBody) {
    res.status(500).send('Raw buffer not detected');
    return;
  }

  const result = verifySignature(req.rawBody, secretKey, signature);

  if (!result.success) {
    console.error(result.error.message);
    res.status(403).send(result.error.message);
    return;
  }

  next();
};
