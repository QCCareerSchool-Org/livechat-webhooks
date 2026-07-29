import compression from 'compression';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { authorizationMiddleware } from './handlers/authorizationMiddleware.mjs';
import { globalErrorHandler } from './handlers/globalErrorHandler.mjs';
import { incomingChatHandler } from './handlers/incomingChatHandler.mjs';

const corsOptions: CorsOptions = {
  allowedHeaders: [ 'content-type', 'authorization' ],
};

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(authorizationMiddleware);

app.post('/incoming-chat', incomingChatHandler);

app.use(globalErrorHandler);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT ?? 8080;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

export default app;
