import type { Properties } from '../properties.mjs';
import type { FieldType } from './fieldType.mjs';
import { isFieldType } from './fieldType.mjs';
import { isProperties } from '../properties.mjs';

export interface FilledFormRequest {
  custom_id?: string;
  type: 'filled_form';
  visibility?: 'all' | 'agents';
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

export interface FilledFormResponse {
  id: string;
  custom_id?: string;
  /** ISO date string */
  created_at: string;
  type: 'filled_form';
  author_id: string;
  visibility: 'all' | 'agents';
  properties?: Properties;
  form_id: string;
  /** he most popular form types include: prechat, postchat, ask_for_email, but those aren’t the only possible options. If you don’t see this field in a chat, it means that chat had been started before we introduced this field (see Changelog). */
  form_type?: string;
  fields: FilledField[];
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

export const isFilledFormRequest = (value: unknown): value is FilledFormRequest => {
  return typeof value === 'object' && value !== null
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'filled_form'
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)))
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'form_id' in value && typeof value.form_id === 'string'
    && 'fields' in value && Array.isArray(value.fields) && value.fields.every(isField);
};

export const isFilledFormResponse = (value: unknown): value is FilledFormResponse => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'type' in value && value.type === 'filled_form'
    && 'author_id' in value && typeof value.author_id === 'string'
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')
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
