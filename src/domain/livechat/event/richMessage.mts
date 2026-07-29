/* eslint-disable camelcase */
import { z } from 'zod';

import type { Properties } from '../properties.mjs';
import type { BaseEventRequest, BaseEventResponse } from './base.mjs';
import { propertiesSchema } from '../properties.mjs';
import { createBaseEventRequestSchema, createBaseEventResponseSchema } from './base.mjs';

export interface RichMessageRequest extends BaseEventRequest<'rich_message'> {
  properties?: Properties;
  template_id: TemplateId;
  elements?: Element<RequestEcommerce>[];
}

export interface RichMessageResponse extends BaseEventResponse<'rich_message'> {
  author_id: string;
  properties?: Properties;
  template_id: TemplateId;
  elements?: Element[];
}

type TemplateId = 'cards' | 'sticker' | 'quick_replies' | 'ecommerce';

interface Element<EcommerceType extends Ecommerce = Ecommerce> {
  title?: string;
  subtitle?: string;
  image?: Image;
  buttons?: Button[];
  ecommerce?: EcommerceType;
}

interface Image {
  url: string;
  name?: string;
  content_type?: string;
  size?: number;
  width?: number;
  height?: number;
  alternative_text?: string;
}

interface BaseButton {
  text: string;
  value: string;
  postback_id: string;
  user_ids: string[];
  target?: 'new' | 'current';
}

type Button = BaseButton & ({
  type: 'webview';
  webview_height: 'compact' | 'full' | 'tall';
} | {
  type: 'message' | 'url' | 'phone';
  webview_height?: 'compact' | 'full' | 'tall';
});

interface Ecommerce {
  view_type?: EcommerceViewType;
  product_id?: string;
  label?: string;
  options?: Option[];
  addons?: Addon[];
}

type EcommerceViewType = 'tags' | 'swatch' | 'images' | 'select';

interface RequestEcommerce extends Ecommerce {
  view_type: EcommerceViewType;
  product_id: string;
}

interface Option {
  option_id: string;
  label: string;
  price?: string;
  regular_price?: string;
  currency?: string;
  color?: string;
  image_url?: string;
  image_thumbnail_url?: string;
  available?: boolean;
  selected?: boolean;
}

interface Addon {
  addon_type: string;
  range_from?: string;
  range_to?: string;
  currency?: string;
}

const templateIdSchema = z.enum([ 'cards', 'sticker', 'quick_replies', 'ecommerce' ]) satisfies z.ZodType<TemplateId>;

const ecommerceViewTypeSchema = z.enum([ 'tags', 'swatch', 'images', 'select' ]) satisfies z.ZodType<EcommerceViewType>;

const imageSchema = z.looseObject({
  url: z.string(),
  name: z.string().optional(),
  content_type: z.string().optional(),
  size: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  alternative_text: z.string().optional(),
}) satisfies z.ZodType<Image>;

const baseButtonSchema = z.looseObject({
  text: z.string(),
  value: z.string(),
  postback_id: z.string(),
  user_ids: z.array(z.string()),
  target: z.enum([ 'new', 'current' ]).optional(),
}) satisfies z.ZodType<BaseButton>;

const buttonSchema = z.union([
  baseButtonSchema.extend({
    type: z.literal('webview'),
    webview_height: z.enum([ 'compact', 'full', 'tall' ]),
  }),
  baseButtonSchema.extend({
    type: z.enum([ 'message', 'url', 'phone' ]),
    webview_height: z.enum([ 'compact', 'full', 'tall' ]).optional(),
  }),
]) satisfies z.ZodType<Button>;

const optionSchema = z.looseObject({
  option_id: z.string(),
  label: z.string(),
  price: z.string().optional(),
  regular_price: z.string().optional(),
  currency: z.string().optional(),
  color: z.string().optional(),
  image_url: z.string().optional(),
  image_thumbnail_url: z.string().optional(),
  available: z.boolean().optional(),
  selected: z.boolean().optional(),
}) satisfies z.ZodType<Option>;

const addonSchema = z.looseObject({
  addon_type: z.string(),
  range_from: z.string().optional(),
  range_to: z.string().optional(),
  currency: z.string().optional(),
}) satisfies z.ZodType<Addon>;

const ecommerceSchema = z.looseObject({
  view_type: ecommerceViewTypeSchema.optional(),
  product_id: z.string().optional(),
  label: z.string().optional(),
  options: z.array(optionSchema).optional(),
  addons: z.array(addonSchema).optional(),
}) satisfies z.ZodType<Ecommerce>;

const requestEcommerceSchema = ecommerceSchema.extend({
  view_type: ecommerceViewTypeSchema,
  product_id: z.string(),
}) satisfies z.ZodType<RequestEcommerce>;

const elementSchema = z.looseObject({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  image: imageSchema.optional(),
  buttons: z.array(buttonSchema).optional(),
  ecommerce: ecommerceSchema.optional(),
}) satisfies z.ZodType<Element>;

const requestElementSchema = elementSchema.extend({
  ecommerce: requestEcommerceSchema.optional(),
}) satisfies z.ZodType<Element<RequestEcommerce>>;

export const richMessageRequestSchema = createBaseEventRequestSchema('rich_message').extend({
  properties: propertiesSchema.optional(),
  template_id: templateIdSchema,
  elements: z.array(requestElementSchema).optional(),
}) satisfies z.ZodType<RichMessageRequest>;

export const richMessageResponseSchema = createBaseEventResponseSchema('rich_message').extend({
  author_id: z.string(),
  properties: propertiesSchema.optional(),
  template_id: templateIdSchema,
  elements: z.array(elementSchema).optional(),
}) satisfies z.ZodType<RichMessageResponse>;

export const isRichMessageRequest = (value: unknown): value is RichMessageRequest => {
  return richMessageRequestSchema.safeParse(value).success;
};

export const isRichMessageResponse = (value: unknown): value is RichMessageResponse => {
  return richMessageResponseSchema.safeParse(value).success;
};
