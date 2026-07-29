import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { isProperties } from '../properties.mjs';
import { isBaseEventRequest, isBaseEventResponse } from './base.mjs';

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

export const isCustomRequest = (value: unknown): value is CustomRequest => {
  return isBaseEventRequest(value, 'custom')
    && (('content' in value && isContent(value.content)) || (!('content' in value)))
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)));
};

export const isCustomResponse = (value: unknown): value is CustomResponse => {
  return isBaseEventResponse(value, 'custom')
    && 'author_id' in value && typeof value.author_id === 'string'
    && (('content' in value && isContent(value.content)) || (!('content' in value)))
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && (('deleted' in value && typeof value.deleted === 'boolean') || (!('deleted' in value)));
};

const isContent = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
