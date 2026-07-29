/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';
import type { FieldType } from './fieldType.mjs';
import { propertiesSchema } from '../properties.mjs';
import { fieldTypeSchema } from './fieldType.mjs';

export interface FormRequest extends BaseEventRequest<'form'> {
  properties?: Properties;
  form_id: string;
  fields: Field[];
}

interface Field {
  type: FieldType;
  id: string;
  label: string;
}

export interface FormResponse extends BaseEventResponse<'form'> {
  author_id: string;
  properties?: Properties;
  form_id: string;
  /** he most popular form types include: prechat, postchat, ask_for_email, but those aren’t the only possible options. If you don’t see this field in a chat, it means that chat had been started before we introduced this field (see Changelog). */
  form_type?: string;
  fields: Field[];
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

const fieldSchema = z.looseObject({
  type: fieldTypeSchema,
  id: z.string(),
  label: z.string(),
}) satisfies z.ZodType<Field>;

export const formRequestSchema = createBaseEventRequestSchema('form').extend({
  properties: propertiesSchema.optional(),
  form_id: z.string(),
  fields: z.array(fieldSchema),
}) satisfies z.ZodType<FormRequest>;

export const formResponseSchema = createBaseEventResponseSchema('form').extend({
  author_id: z.string(),
  properties: propertiesSchema.optional(),
  form_id: z.string(),
  form_type: z.string().optional(),
  fields: z.array(fieldSchema),
  deleted: z.boolean().optional(),
}) satisfies z.ZodType<FormResponse>;

export const isFormRequest = (value: unknown): value is FormRequest => {
  return formRequestSchema.safeParse(value).success;
};

export const isFormResponse = (value: unknown): value is FormResponse => {
  return formResponseSchema.safeParse(value).success;
};
