import { z } from 'zod';

import type { BaseEventResponse } from './base.mjs';
import { createBaseEventResponseSchema } from './base.mjs';

const aiAgentSystemSubtypes = [
  'custom_skill_awaiting_feedback',
  'custom_skill_completed',
  'custom_skill_failed',
  'custom_skill_rejected',
  'custom_skill_started',
] as const;

type AiAgentSystemSubtype = typeof aiAgentSystemSubtypes[number];

const cdpSystemSubtypes = [
  'store_order_was_created',
  'store_product_added_to_cart',
  'store_product_removed_from_cart',
] as const;

type CdpSystemSubtype = typeof cdpSystemSubtypes[number];

const messagingSystemSubtypes = [ 'summary' ] as const;

type MessagingSystemSubtype = typeof messagingSystemSubtypes[number];

interface SystemResponseBase extends BaseEventResponse<'system'> {
  version: number;
  details: string;
}

type SystemActivity = {
  source: 'ai_agents';
  subtype: AiAgentSystemSubtype;
} | {
  source: 'cdp';
  subtype: CdpSystemSubtype;
} | {
  source: 'messaging';
  subtype: MessagingSystemSubtype;
};

export type SystemResponse = SystemResponseBase & SystemActivity;

export const aiAgentSystemSubtypeSchema = z.enum(aiAgentSystemSubtypes) satisfies z.ZodType<AiAgentSystemSubtype>;

export const cdpSystemSubtypeSchema = z.enum(cdpSystemSubtypes) satisfies z.ZodType<CdpSystemSubtype>;

export const messagingSystemSubtypeSchema = z.enum(messagingSystemSubtypes) satisfies z.ZodType<MessagingSystemSubtype>;

const systemResponseBaseSchema = createBaseEventResponseSchema('system').extend({
  version: z.number(),
  details: z.string(),
}) satisfies z.ZodType<SystemResponseBase>;

const aiAgentSystemResponseSchema = systemResponseBaseSchema.extend({
  source: z.literal('ai_agents'),
  subtype: aiAgentSystemSubtypeSchema,
}) satisfies z.ZodType<SystemResponseBase & Extract<SystemActivity, { source: 'ai_agents' }>>;

const cdpSystemResponseSchema = systemResponseBaseSchema.extend({
  source: z.literal('cdp'),
  subtype: cdpSystemSubtypeSchema,
}) satisfies z.ZodType<SystemResponseBase & Extract<SystemActivity, { source: 'cdp' }>>;

const messagingSystemResponseSchema = systemResponseBaseSchema.extend({
  source: z.literal('messaging'),
  subtype: messagingSystemSubtypeSchema,
}) satisfies z.ZodType<SystemResponseBase & Extract<SystemActivity, { source: 'messaging' }>>;

export const systemResponseSchema = z.discriminatedUnion('source', [
  aiAgentSystemResponseSchema,
  cdpSystemResponseSchema,
  messagingSystemResponseSchema,
]) satisfies z.ZodType<SystemResponse>;

export const isSystemResponse = (value: unknown): value is SystemResponse => {
  return systemResponseSchema.safeParse(value).success;
};
