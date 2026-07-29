import type { Properties } from '../properties.mjs';
import { isProperties } from '../properties.mjs';

export interface CustomRequest {
  custom_id?: string;
  type: 'custom';
  content?: Record<string, unknown>;
  visibility?: 'all' | 'agents';
  properties?: Properties;
}

export interface CustomResponse {
  id: string;
  custom_id?: string;
  type: 'custom';
  author_id: string;
  /** ISO date string */
  created_at: string;
  content?: Record<string, unknown>;
  visibility: 'all' | 'agents';
  properties?: Properties;
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

export const isCustomRequest = (value: unknown): value is CustomRequest => {
  return typeof value === 'object' && value !== null
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'custom'
    && (('content' in value && isContent(value.content)) || (!('content' in value)))
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)))
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)));
};

export const isCustomResponse = (value: unknown): value is CustomResponse => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'custom'
    && 'author_id' in value && typeof value.author_id === 'string'
    && 'created_at' in value && typeof value.created_at === 'string'
    && (('content' in value && isContent(value.content)) || (!('content' in value)))
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && (('deleted' in value && typeof value.deleted === 'boolean') || (!('deleted' in value)));
};

const isContent = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
