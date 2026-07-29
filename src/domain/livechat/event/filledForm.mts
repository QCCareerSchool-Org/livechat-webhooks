import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import type { FieldType } from './fieldType.mjs';
import { isFieldType } from './fieldType.mjs';
import { isProperties } from '../properties.mjs';
import { isBaseEventRequest, isBaseEventResponse } from './base.mjs';

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

export const isFilledFormRequest = (value: unknown): value is FilledFormRequest => {
  return isBaseEventRequest(value, 'filled_form')
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'form_id' in value && typeof value.form_id === 'string'
    && 'fields' in value && Array.isArray(value.fields) && value.fields.every(isField);
};

export const isFilledFormResponse = (value: unknown): value is FilledFormResponse => {
  return isBaseEventResponse(value, 'filled_form')
    && 'author_id' in value && typeof value.author_id === 'string'
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'form_id' in value && typeof value.form_id === 'string'
    && (('form_type' in value && typeof value.form_type === 'string') || (!('form_type' in value)))
    && 'fields' in value && Array.isArray(value.fields) && value.fields.every(isField)
    && (('deleted' in value && typeof value.deleted === 'boolean') || (!('deleted' in value)));
};

const isField = (value: unknown): value is FilledField => {
  return typeof value === 'object' && value !== null
  && 'type' in value && isFieldType(value.type)
  && 'id' in value && typeof value.id === 'string'
  && 'label' in value && typeof value.label === 'string'
  && 'answer' in value && (typeof value.answer === 'string' || (typeof value.answer === 'object' && value.answer !== null
    && 'id' in value.answer && typeof value.answer.id === 'string'
    && 'label' in value.answer && typeof value.answer.label === 'string'
    && 'group_id' in value.answer && typeof value.answer.group_id === 'number'));
};
