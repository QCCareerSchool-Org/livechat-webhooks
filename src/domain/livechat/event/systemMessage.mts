/* eslint-disable camelcase */
import { z } from 'zod';

import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';

const systemMessageTypes = [
  'agent_added',
  'agent_joined',
  'agent_left',
  'agent_removed',
  'archived_customer_disconnected',
  'chat_transferred',
  'customer_added',
  'customer_banned',
  'customer_removed',
  'customer_updated',
  'manual_archived_agent',
  'manual_archived_customer',
  'rating.chat_commented',
  'rating.chat_rated',
  'rating.chat_rating_canceled',
  'routing.archived_deleted',
  'routing.archived_disconnected',
  'routing.archived_inactive',
  'routing.archived_offline',
  'routing.archived_other',
  'routing.archived_remotely_signed_out',
  'routing.archived_signed_out',
  'routing.assigned_deleted',
  'routing.assigned_disconnected',
  'routing.assigned_inactive',
  'routing.assigned_other',
  'routing.assigned_remotely_signed_out',
  'routing.assigned_signed_out',
  'routing.idle',
  'routing.unassigned_deleted',
  'routing.unassigned_disconnected',
  'routing.unassigned_other',
  'routing.unassigned_remotely_signed_out',
  'routing.unassigned_signed_out',
  'system_archived',
  'transcript_requested',
  'transcript_sent',
] as const;

export type SystemMessageType = typeof systemMessageTypes[number];

export interface SystemMessageRequest extends BaseEventRequest<'system_message'> {
  text?: string;
  system_message_type: SystemMessageType;
  text_vars?: Record<string, unknown>;
}

export interface SystemMessageResponse extends BaseEventResponse<'system_message'> {
  text?: string;
  system_message_type: SystemMessageType;
  text_vars?: Record<string, unknown>;
}

export const systemMessageTypeSchema = z.enum(systemMessageTypes) satisfies z.ZodType<SystemMessageType>;

const textVarsSchema = z.record(z.string(), z.unknown()) satisfies z.ZodType<Record<string, unknown>>;

export const systemMessageRequestSchema = createBaseEventRequestSchema('system_message').extend({
  text: z.string().optional(),
  system_message_type: systemMessageTypeSchema,
  text_vars: textVarsSchema.optional(),
}) satisfies z.ZodType<SystemMessageRequest>;

export const systemMessageResponseSchema = createBaseEventResponseSchema('system_message').extend({
  text: z.string().optional(),
  system_message_type: systemMessageTypeSchema,
  text_vars: textVarsSchema.optional(),
}) satisfies z.ZodType<SystemMessageResponse>;

export const isSystemMessageRequest = (value: unknown): value is SystemMessageRequest => {
  return systemMessageRequestSchema.safeParse(value).success;
};

export const isSystemMessageResponse = (value: unknown): value is SystemMessageResponse => {
  return systemMessageResponseSchema.safeParse(value).success;
};
