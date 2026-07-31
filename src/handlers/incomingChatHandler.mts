import type { RequestHandler } from 'express';
import { inspect } from 'node:util';

import { incomingChatSchema } from '#domain/livechat/webhook/incomingChat.mjs';
import { incomingChatInterator } from '#interactors/incomingChatInteractor.mjs';

export const incomingChatHandler: RequestHandler = async (req, res) => {
  console.log(inspect(req.body, true, 10));

  const parseResult = incomingChatSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).send(parseResult.error.issues);
    return;
  }

  const incomingChat = parseResult.data;

  const result = await incomingChatInterator(incomingChat);
  if (!result.success) {
    res.sendStatus(500);
    return;
  }

  res.end();
};
