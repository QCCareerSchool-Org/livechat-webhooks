/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import { propertiesSchema } from '../properties.mjs';

const actions = [ 'incoming_chat', 'chat_deactivated', 'chat_access_updated', 'chat_transferred', 'user_added_to_chat', 'user_removed_from_chat', 'incoming_event', 'event_deleted', 'event_updated', 'incoming_rich_message_postback', 'chat_properties_updated', 'chat_properties_deleted', 'thread_properties_deleted', 'thread_properties_updated', 'event_properties_updated', 'event_properties_deleted', 'thread_tagged', 'thread_untagged', 'routing_status_set', 'customer_session_fields_updated', 'agent_created', 'agent_approved', 'agent_updated', 'agent_suspended', 'agent_unsuspended', 'agent_deleted', 'auto_accesses_updated', 'bot_created', 'bot_updated', 'bot_deleted', 'group_created', 'group_updated', 'group_deleted', 'tag_created', 'tag_deleted', 'tag_updated', 'events_marked_as_seen', 'thread_summary_set' ] as const;

export type WebhookAction = typeof actions[number];

export interface WebhookRequest<Action extends WebhookAction = WebhookAction, Payload = unknown> {
  webhook_id: string;
  secret_key: string;
  action: Action;
  organization_id: string;
  payload: Payload;
  additional_data: AdditionalData;
}

interface AdditionalData {
  chat_properties?: Properties;
  chat_presence_user_ids?: string[];
}

export const webhookActionSchema = z.enum(actions) satisfies z.ZodType<WebhookAction>;

export const additionalDataSchema = z.looseObject({
  chat_properties: propertiesSchema.optional(),
  chat_presence_user_ids: z.array(z.string()).optional(),
}) satisfies z.ZodType<AdditionalData>;

export const webhookRequestSchema = z.looseObject({
  webhook_id: z.string(),
  secret_key: z.string(),
  action: webhookActionSchema,
  organization_id: z.string(),
  payload: z.unknown(),
  additional_data: additionalDataSchema,
}) satisfies z.ZodType<WebhookRequest>;

export const createWebhookRequestSchema = <Action extends WebhookAction, Payload>(
  action: Action,
  payloadSchema: z.ZodType<Payload>,
) => webhookRequestSchema.extend({
  action: z.literal(action),
  payload: payloadSchema,
}) satisfies z.ZodType<WebhookRequest<Action, Payload>>;

export const isWebhookAction = (value: unknown): value is WebhookAction => {
  return webhookActionSchema.safeParse(value).success;
};

export const isWebhookRequest = (value: unknown): value is WebhookRequest => {
  return webhookRequestSchema.safeParse(value).success;
};
