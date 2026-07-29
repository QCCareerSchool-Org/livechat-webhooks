/* eslint-disable camelcase */
import { z } from 'zod';

interface BaseAgent {
  id: string;
  type: 'agent';
  name: string;
  email: string;
  present: boolean;
  avatar: string;
}

export interface Agent extends BaseAgent {
  /** RFC 3339 date string */
  events_seen_up_to: string;
  visibility: 'all' | 'agents';
}

export interface MyProfile extends BaseAgent {
  /** RFC 3339 date string */
  events_seen_up_to?: string;
  routing_status?: string;
  permission: string;
}

const baseAgentSchema = z.looseObject({
  id: z.string(),
  type: z.literal('agent'),
  name: z.string(),
  email: z.string(),
  present: z.boolean(),
  avatar: z.string(),
}) satisfies z.ZodType<BaseAgent>;

export const agentSchema = baseAgentSchema.extend({
  events_seen_up_to: z.string(),
  visibility: z.enum([ 'all', 'agents' ]),
}) satisfies z.ZodType<Agent>;

export const myProfileSchema = baseAgentSchema.extend({
  events_seen_up_to: z.string().optional(),
  routing_status: z.string().optional(),
  permission: z.string(),
}) satisfies z.ZodType<MyProfile>;

export const isAgent = (value: unknown): value is Agent => {
  return agentSchema.safeParse(value).success;
};

export const isMyProfile = (value: unknown): value is MyProfile => {
  return myProfileSchema.safeParse(value).success;
};
