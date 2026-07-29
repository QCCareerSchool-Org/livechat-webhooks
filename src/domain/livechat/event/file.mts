import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { isProperties } from '../properties.mjs';
import { isBaseEventRequest, isBaseEventResponse } from './base.mjs';

export interface FileRequest extends BaseEventRequest<'file'> {
  properties?: Properties;
  /** Has to point to the LiveChat CDN. It's recommended to use the URL returned by upload_file */
  url: string;
  /** Only applicable to images */
  alternative_text?: string;
}

export interface FileResponse extends BaseEventResponse<'file'> {
  author_id: string;
  properties?: Properties;
  name: string;
  url: string;
  /** only for images */
  thumbnail_url?: string;
  /** only for images */
  thumbnail2x_url?: string;
  content_type: string;
  /** only for images */
  size?: string;
  /** only for images */
  width?: string;
  /** only for images */
  height?: string;
  /** only for images */
  alternative_text?: string;
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

export const isFileRequest = (value: unknown): value is FileRequest => {
  return isBaseEventRequest(value, 'file')
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'url' in value && typeof value.url === 'string'
    && (('alternative_text' in value && typeof value.alternative_text === 'string') || (!('alternative_text' in value)));
};

export const isFileResponse = (value: unknown): value is FileResponse => {
  return isBaseEventResponse(value, 'file')
    && 'author_id' in value && typeof value.author_id === 'string'
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'name' in value && typeof value.name === 'string'
    && 'url' in value && typeof value.url === 'string'
    && (('thumbnail_url' in value && typeof value.thumbnail_url === 'string') || (!('thumbnail_url' in value)))
    && (('thumbnail2x_url' in value && typeof value.thumbnail2x_url === 'string') || (!('thumbnail2x_url' in value)))
    && 'content_type' in value && typeof value.content_type === 'string'
    && (('size' in value && typeof value.size === 'string') || (!('size' in value)))
    && (('width' in value && typeof value.width === 'string') || (!('width' in value)))
    && (('height' in value && typeof value.height === 'string') || (!('height' in value)))
    && (('alternative_text' in value && typeof value.alternative_text === 'string') || (!('alternative_text' in value)))
    && (('deleted' in value && typeof value.deleted === 'boolean') || (!('deleted' in value)));
};
