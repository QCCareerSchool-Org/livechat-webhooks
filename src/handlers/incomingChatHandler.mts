import type { RequestHandler } from 'express';

import { isIncomingChat } from '../domain/incomingChat.mjs';
import { incomingChatInterator } from '../interactors/incomingChatInteractor.mjs';

export const incomingChatHandler: RequestHandler = async (req, res) => {
  if (!isIncomingChat(req.body)) {
    res.sendStatus(404);
    return;
  }

  const result = await incomingChatInterator(req.body);
  if (!result.success) {
    res.sendStatus(500);
    return;
  }

  res.end();
};
