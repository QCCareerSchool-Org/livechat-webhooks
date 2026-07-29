/* eslint-disable camelcase */
import { z } from 'zod';

const eventTypes = [ 'file', 'form', 'filled_form', 'message', 'rich_message', 'custom', 'system_message', 'system' ] as const;

export type EventType = typeof eventTypes[number];

export type Visibility = 'all' | 'agents';

export interface BaseEventRequest<Type extends EventType = EventType> {
  custom_id?: string;
  type: Type;
  visibility?: Visibility;
}

export interface BaseEventResponse<Type extends EventType = EventType> {
  id: string;
  custom_id?: string;
  type: Type;
  /** ISO date string */
  created_at: string;
  visibility: Visibility;
}

export const eventTypeSchema = z.enum(eventTypes) satisfies z.ZodType<EventType>;

export const visibilitySchema = z.enum([ 'all', 'agents' ]) satisfies z.ZodType<Visibility>;

export const isEventType = (value: unknown): value is EventType => {
  return eventTypeSchema.safeParse(value).success;
};

export const baseEventRequestSchema = z.looseObject({
  custom_id: z.string().optional(),
  type: eventTypeSchema,
  visibility: visibilitySchema.optional(),
}) satisfies z.ZodType<BaseEventRequest>;

export const baseEventResponseSchema = z.looseObject({
  id: z.string(),
  custom_id: z.string().optional(),
  type: eventTypeSchema,
  created_at: z.string(),
  visibility: visibilitySchema,
}) satisfies z.ZodType<BaseEventResponse>;

export const createBaseEventRequestSchema = <Type extends EventType>(type: Type) => baseEventRequestSchema.extend({
  type: z.literal(type),
}) satisfies z.ZodType<BaseEventRequest<Type>>;

export const createBaseEventResponseSchema = <Type extends EventType>(type: Type) => baseEventResponseSchema.extend({
  type: z.literal(type),
}) satisfies z.ZodType<BaseEventResponse<Type>>;

export const isBaseEventRequest = <Type extends EventType>(value: unknown, type: Type): value is BaseEventRequest<Type> => {
  const result = baseEventRequestSchema.safeParse(value);

  return result.success && result.data.type === type;
};

export const isBaseEventResponse = <Type extends EventType>(value: unknown, type: Type): value is BaseEventResponse<Type> => {
  const result = baseEventResponseSchema.safeParse(value);

  return result.success && result.data.type === type;
};
