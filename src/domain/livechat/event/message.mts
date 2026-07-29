/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { propertiesSchema } from '../properties.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';

export interface MessageRequest extends BaseEventRequest<'message'> {
  /** Max. raw text size is 16 KB (one UTF-8 char like emoji 😁 can use up to 4 B); to send more, split text into several messages. */
  text: string;
  properties?: Properties;
  /** Indicates that the message event was generated in response to a rich message event. */
  postback?: PostBack;
}

export interface MessageResponse extends BaseEventResponse<'message'> {
  author_id: string;
  /** Max. raw text size is 16 KB (one UTF-8 char like emoji 😁 can use up to 4 B); to send more, split text into several messages. */
  text: string;
  properties?: Properties;
  /** Indicates that the message event was generated in response to a rich message event. */
  postback?: PostBack;
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

interface BasePostBack {
  /** ID of the postback from the rich message event. */
  id: string;
  /** ID of the thread with the rich message event. */
  thread_id: string;
  /** ID of the rich message event. */
  event_id: string;
  /** Object containing data specific to rich messages with ecommerce template, like product_id. */
  ecommerce?: Ecommerce;
}

type PostBack = BasePostBack & ({
  /** Should be used together with postback.value (when one of them is present, the other is required). */
  type?: never;
  /** Should be used together with postback.type (when one of them is present, the other is required). */
  value?: never;
} | {
  /** Should be used together with postback.value (when one of them is present, the other is required). */
  type: string;
  /** Should be used together with postback.type (when one of them is present, the other is required). */
  value: string;
});

interface Ecommerce {
  /** The ID of the product displayed by the rich message. Required when sending postback.ecommerce. */
  product_id?: string;
  /** The ID of the selected option for the product. */
  option_id?: string;
  /** Quantity of the product. */
  quantity?: number;
}

const ecommerceSchema = z.looseObject({
  product_id: z.string().optional(),
  option_id: z.string().optional(),
  quantity: z.number().optional(),
}) satisfies z.ZodType<Ecommerce>;

const basePostBackSchema = z.looseObject({
  id: z.string(),
  thread_id: z.string(),
  event_id: z.string(),
  ecommerce: ecommerceSchema.optional(),
}) satisfies z.ZodType<BasePostBack>;

const postBackSchema = z.union([
  basePostBackSchema.extend({
    type: z.never().optional(),
    value: z.never().optional(),
  }),
  basePostBackSchema.extend({
    type: z.string(),
    value: z.string(),
  }),
]) satisfies z.ZodType<PostBack>;

export const messageRequestSchema = createBaseEventRequestSchema('message').extend({
  text: z.string(),
  properties: propertiesSchema.optional(),
  postback: postBackSchema.optional(),
}) satisfies z.ZodType<MessageRequest>;

export const messageResponseSchema = createBaseEventResponseSchema('message').extend({
  author_id: z.string(),
  text: z.string(),
  properties: propertiesSchema.optional(),
  postback: postBackSchema.optional(),
  deleted: z.boolean().optional(),
}) satisfies z.ZodType<MessageResponse>;

export const isMessageRequest = (value: unknown): value is MessageRequest => {
  return messageRequestSchema.safeParse(value).success;
};

export const isMessageResponse = (value: unknown): value is MessageResponse => {
  return messageResponseSchema.safeParse(value).success;
};
