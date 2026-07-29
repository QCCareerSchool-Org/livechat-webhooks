import type { Chat } from '../chat.mjs';
import { isChat } from '../chat.mjs';
import { isWebhookRequest, type WebhookRequest } from './index.mjs';

export interface IncomingChat extends WebhookRequest {
  action: 'incoming_chat';
  payload: {
    chat: Chat;
  };
}

export const isIncomingChat = (value: unknown): value is IncomingChat => {
  return isWebhookRequest(value)
    && value.action === 'incoming_chat'
    && isPayload(value.payload);
};

const isPayload = (value: unknown): value is { chat: Chat } => {
  return typeof value === 'object' && value !== null
    && 'chat' in value && isChat(value.chat);
};
