/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';
import type { FieldType } from './fieldType.mjs';
import { propertiesSchema } from '../properties.mjs';

export interface FilledFormRequest extends BaseEventRequest<'filled_form'> {
  properties?: Properties;
  form_id: string;
  fields: FilledFormField[];
}

interface FilledField {
  id: string;
  label: string;
  type: FieldType;
}

interface TextFilledField extends FilledField {
  type: 'email' | 'name' | 'question' | 'subject' | 'textarea';
  answer: string;
}

interface ChoiceAnswer {
  id: string | number;
  label: string;
}

interface ChoiceFilledField extends FilledField {
  type: 'radio' | 'select';
  answer: ChoiceAnswer;
}

interface GroupChooserFilledField extends FilledField {
  type: 'group_chooser';
  answer: ChoiceAnswer & {
    group_id: number;
  };
}

interface CheckboxAnswersFilledField extends FilledField {
  type: 'checkbox';
  answers: ChoiceAnswer[];
}

interface CheckboxAnswerFilledField extends FilledField {
  type: 'checkbox';
  answer: string;
}

interface CheckboxOption {
  id: string | number;
  value: string;
}

interface CheckboxOptionsFilledField extends FilledField {
  type: 'checkbox';
  options?: CheckboxOption[];
}

type FilledFormField = TextFilledField
  | ChoiceFilledField
  | GroupChooserFilledField
  | CheckboxAnswerFilledField
  | CheckboxAnswersFilledField
  | CheckboxOptionsFilledField;

export interface FilledFormResponse extends BaseEventResponse<'filled_form'> {
  author_id: string;
  properties?: Properties;
  form_id: string;
  /** he most popular form types include: prechat, postchat, ask_for_email, but those aren’t the only possible options. If you don’t see this field in a chat, it means that chat had been started before we introduced this field (see Changelog). */
  form_type?: string;
  fields: FilledFormField[];
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

const choiceAnswerSchema = z.looseObject({
  id: z.union([ z.string(), z.number() ]),
  label: z.string(),
}) satisfies z.ZodType<ChoiceAnswer>;

const textFilledFieldSchema = z.looseObject({
  type: z.enum([ 'email', 'name', 'question', 'subject', 'textarea' ]),
  id: z.string(),
  label: z.string(),
  answer: z.string(),
}) satisfies z.ZodType<TextFilledField>;

const choiceFilledFieldSchema = z.looseObject({
  type: z.enum([ 'radio', 'select' ]),
  id: z.string(),
  label: z.string(),
  answer: choiceAnswerSchema,
}) satisfies z.ZodType<ChoiceFilledField>;

const groupChooserFilledFieldSchema = z.looseObject({
  type: z.literal('group_chooser'),
  id: z.string(),
  label: z.string(),
  answer: choiceAnswerSchema.extend({
    group_id: z.number(),
  }),
}) satisfies z.ZodType<GroupChooserFilledField>;

const checkboxAnswersFilledFieldSchema = z.looseObject({
  type: z.literal('checkbox'),
  id: z.string(),
  label: z.string(),
  answers: z.array(choiceAnswerSchema),
}) satisfies z.ZodType<CheckboxAnswersFilledField>;

const checkboxAnswerFilledFieldSchema = z.looseObject({
  type: z.literal('checkbox'),
  id: z.string(),
  label: z.string(),
  answer: z.string(),
}) satisfies z.ZodType<CheckboxAnswerFilledField>;

const checkboxOptionsFilledFieldSchema = z.looseObject({
  type: z.literal('checkbox'),
  id: z.string(),
  label: z.string(),
  options: z.array(z.looseObject({
    id: z.union([ z.string(), z.number() ]),
    value: z.string(),
  })).optional(),
}) satisfies z.ZodType<CheckboxOptionsFilledField>;

const filledFieldSchema = z.union([
  textFilledFieldSchema,
  choiceFilledFieldSchema,
  groupChooserFilledFieldSchema,
  checkboxAnswerFilledFieldSchema,
  checkboxAnswersFilledFieldSchema,
  checkboxOptionsFilledFieldSchema,
]) satisfies z.ZodType<FilledFormField>;

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
