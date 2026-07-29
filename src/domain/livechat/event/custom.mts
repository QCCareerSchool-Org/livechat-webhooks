/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { propertiesSchema } from '../properties.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';

export interface CustomRequest extends BaseEventRequest<'custom'> {
  content?: Record<string, unknown>;
  properties?: Properties;
}

export interface CustomResponse extends BaseEventResponse<'custom'> {
  author_id: string;
  content?: Record<string, unknown>;
  properties?: Properties;
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

const contentSchema = z.record(z.string(), z.unknown()) satisfies z.ZodType<Record<string, unknown>>;

export const customRequestSchema = createBaseEventRequestSchema('custom').extend({
  content: contentSchema.optional(),
  properties: propertiesSchema.optional(),
}) satisfies z.ZodType<CustomRequest>;

export const customResponseSchema = createBaseEventResponseSchema('custom').extend({
  author_id: z.string(),
  content: contentSchema.optional(),
  properties: propertiesSchema.optional(),
  deleted: z.boolean().optional(),
}) satisfies z.ZodType<CustomResponse>;

export const isCustomRequest = (value: unknown): value is CustomRequest => {
  return customRequestSchema.safeParse(value).success;
};

export const isCustomResponse = (value: unknown): value is CustomResponse => {
  return customResponseSchema.safeParse(value).success;
};
