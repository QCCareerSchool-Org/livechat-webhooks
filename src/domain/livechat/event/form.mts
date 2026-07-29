import type { Properties } from '../properties.mjs';
import type { FieldType } from './fieldType.mjs';
import { isProperties } from '../properties.mjs';
import { isFieldType } from './fieldType.mjs';

export interface FormRequest {
  custom_id?: string;
  type: 'form';
  visibility?: 'all' | 'agents';
  properties?: Properties;
  form_id: string;
  fields: Field[];
}

interface Field {
  type: FieldType;
  id: string;
  label: string;
}

export interface FormResponse {
  id: string;
  custom_id?: string;
  /** ISO date string */
  created_at: string;
  type: 'form';
  author_id: string;
  visibility: 'all' | 'agents';
  properties?: Properties;
  form_id: string;
  /** he most popular form types include: prechat, postchat, ask_for_email, but those aren’t the only possible options. If you don’t see this field in a chat, it means that chat had been started before we introduced this field (see Changelog). */
  form_type?: string;
  fields: Field[];
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

export const isFormRequest = (value: unknown): value is FormRequest => {
  return typeof value === 'object' && value !== null
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'form'
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)))
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'form_id' in value && typeof value.form_id === 'string'
    && 'fields' in value && Array.isArray(value.fields) && value.fields.every(isField);
};

export const isFormResponse = (value: unknown): value is FormResponse => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'type' in value && value.type === 'form'
    && 'author_id' in value && typeof value.author_id === 'string'
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'form_id' in value && typeof value.form_id === 'string'
    && (('form_type' in value && typeof value.form_type === 'string') || (!('form_type' in value)))
    && 'fields' in value && Array.isArray(value.fields) && value.fields.every(isField)
    && (('deleted' in value && typeof value.deleted === 'boolean') || (!('deleted' in value)));
};

const isField = (value: unknown): value is Field => {
  return typeof value === 'object' && value !== null
  && 'type' in value && isFieldType(value.type)
  && 'id' in value && typeof value.id === 'string'
  && 'label' in value && typeof value.label === 'string';
};
