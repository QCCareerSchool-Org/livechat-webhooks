/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';
import type { FieldType } from './fieldType.mjs';
import { propertiesSchema } from '../properties.mjs';
import { fieldTypeSchema } from './fieldType.mjs';

export interface FilledFormRequest extends BaseEventRequest<'filled_form'> {
  properties?: Properties;
  form_id: string;
  fields: FilledField[];
}

interface FilledField {
  type: FieldType;
  id: string;
  label: string;
  answer: string | {
    id: string;
    label: string;
    group_id: number;
  };
}

export interface FilledFormResponse extends BaseEventResponse<'filled_form'> {
  author_id: string;
  properties?: Properties;
  form_id: string;
  /** he most popular form types include: prechat, postchat, ask_for_email, but those aren’t the only possible options. If you don’t see this field in a chat, it means that chat had been started before we introduced this field (see Changelog). */
  form_type?: string;
  fields: FilledField[];
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

const filledAnswerSchema = z.union([
  z.string(),
  z.looseObject({
    id: z.string(),
    label: z.string(),
    group_id: z.number(),
  }),
]) satisfies z.ZodType<FilledField['answer']>;

const filledFieldSchema = z.looseObject({
  type: fieldTypeSchema,
  id: z.string(),
  label: z.string(),
  answer: filledAnswerSchema,
}) satisfies z.ZodType<FilledField>;

export const filledFormRequestSchema = createBaseEventRequestSchema('filled_form').extend({
  properties: propertiesSchema.optional(),
  form_id: z.string(),
  fields: z.array(filledFieldSchema),
}) satisfies z.ZodType<FilledFormRequest>;

export const filledFormResponseSchema = createBaseEventResponseSchema('filled_form').extend({
  author_id: z.string(),
  properties: propertiesSchema.optional(),
  form_id: z.string(),
  form_type: z.string().optional(),
  fields: z.array(filledFieldSchema),
  deleted: z.boolean().optional(),
}) satisfies z.ZodType<FilledFormResponse>;

export const isFilledFormRequest = (value: unknown): value is FilledFormRequest => {
  return filledFormRequestSchema.safeParse(value).success;
};

export const isFilledFormResponse = (value: unknown): value is FilledFormResponse => {
  return filledFormResponseSchema.safeParse(value).success;
};
