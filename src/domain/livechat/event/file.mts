/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { propertiesSchema } from '../properties.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';

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

export const fileRequestSchema = createBaseEventRequestSchema('file').extend({
  properties: propertiesSchema.optional(),
  url: z.string(),
  alternative_text: z.string().optional(),
}) satisfies z.ZodType<FileRequest>;

export const fileResponseSchema = createBaseEventResponseSchema('file').extend({
  author_id: z.string(),
  properties: propertiesSchema.optional(),
  name: z.string(),
  url: z.string(),
  thumbnail_url: z.string().optional(),
  thumbnail2x_url: z.string().optional(),
  content_type: z.string(),
  size: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  alternative_text: z.string().optional(),
  deleted: z.boolean().optional(),
}) satisfies z.ZodType<FileResponse>;

export const isFileRequest = (value: unknown): value is FileRequest => {
  return fileRequestSchema.safeParse(value).success;
};

export const isFileResponse = (value: unknown): value is FileResponse => {
  return fileResponseSchema.safeParse(value).success;
};
