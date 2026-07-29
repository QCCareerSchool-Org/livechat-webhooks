import { z } from 'zod';

import type { Chat } from '../chat.mjs';
import { chatSchema } from '../chat.mjs';
import { createWebhookRequestSchema, type WebhookRequest } from './index.mjs';

interface IncomingChatPayload {
  chat: Chat;
}

export type IncomingChat = WebhookRequest<'incoming_chat', IncomingChatPayload>;

const incomingChatPayloadSchema = z.looseObject({
  chat: chatSchema,
}) satisfies z.ZodType<IncomingChatPayload>;

export const incomingChatSchema = createWebhookRequestSchema(
  'incoming_chat',
  incomingChatPayloadSchema,
) satisfies z.ZodType<IncomingChat>;

export const isIncomingChat = (value: unknown): value is IncomingChat => {
  return incomingChatSchema.safeParse(value).success;
};
