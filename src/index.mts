import compression from 'compression';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { getAuthorizationMiddleware } from '#handlers/authorizationMiddleware.mjs';
import { globalErrorHandler } from '#handlers/globalErrorHandler.mjs';
import { incomingChatHandler } from '#handlers/incomingChatHandler.mjs';

const corsOptions: CorsOptions = {
  allowedHeaders: [ 'content-type', 'authorization' ],
};

declare module 'node:http' {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw Error('Environment variable SECRET_KEY not found.');
}

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

app.use(getAuthorizationMiddleware(secretKey));

app.post('/incomingChat', incomingChatHandler);

app.use(globalErrorHandler);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT ?? 8080;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

export default app;
