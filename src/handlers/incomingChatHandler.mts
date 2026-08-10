import type { RequestHandler } from 'express';
import { inspect } from 'node:util';

import { incomingChatSchema } from '#domain/livechat/webhook/incomingChat.mjs';
import { incomingChatInterator } from '#interactors/incomingChatInteractor.mjs';

export const incomingChatHandler: RequestHandler = async (req, res) => {
  const parseResult = incomingChatSchema.safeParse(req.body);
  if (!parseResult.success) {
    console.error(inspect(parseResult.error.issues, false, 10));
    res.status(400).send(parseResult.error.issues);
    return;
  }

  const incomingChat = parseResult.data;

  const result = await incomingChatInterator(incomingChat);
  if (!result.success) {
    console.error(result.error.message);
    res.status(500).send(result.error.message);
    return;
  }

  res.end();
};
