import type { RequestHandler } from 'express';

import { incomingChatSchema } from '#domain/livechat/webhook/incomingChat.mjs';
import { incomingChatInterator } from '#interactors/incomingChatInteractor.mjs';

export const incomingChatHandler: RequestHandler = async (req, res) => {
  const parseResult = incomingChatSchema.safeParse(req.body);
  if (!parseResult.success) {
    console.error(parseResult.error.issues);
    res.status(400).send(parseResult.error.issues);
    return;
  }

  const incomingChat = parseResult.data;

  const result = await incomingChatInterator(incomingChat);
  if (!result.success) {
    res.status(500).send(result.error.message);
    return;
  }

  res.end();
};
