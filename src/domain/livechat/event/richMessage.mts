import type { Properties } from '../properties.mjs';
import { isProperties } from '../properties.mjs';

export interface RichMessageRequest {
  custom_id?: string;
  type: 'rich_message';
  visibility?: 'all' | 'agents';
  properties?: Properties;
  template_id: TemplateId;
  elements?: Element<RequestEcommerce>[];
}

export interface RichMessageResponse {
  id: string;
  custom_id?: string;
  /** ISO date string */
  created_at: string;
  type: 'rich_message';
  author_id: string;
  visibility: 'all' | 'agents';
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

type Button = {
  text: string;
  value: string;
  postback_id: string;
  user_ids: string[];
  target?: 'new' | 'current';
} & ({
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

export const isRichMessageRequest = (value: unknown): value is RichMessageRequest => {
  return typeof value === 'object' && value !== null
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'rich_message'
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)))
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'template_id' in value && isTemplateId(value.template_id)
    && (('elements' in value && Array.isArray(value.elements) && value.elements.every(isRequestElement)) || (!('elements' in value)));
};

export const isRichMessageResponse = (value: unknown): value is RichMessageResponse => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'type' in value && value.type === 'rich_message'
    && 'author_id' in value && typeof value.author_id === 'string'
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && 'template_id' in value && isTemplateId(value.template_id)
    && (('elements' in value && Array.isArray(value.elements) && value.elements.every(isElement)) || (!('elements' in value)));
};

const isTemplateId = (value: unknown): value is TemplateId => {
  return value === 'cards' || value === 'sticker' || value === 'quick_replies' || value === 'ecommerce';
};

const isElement = (value: unknown): value is Element => {
  return typeof value === 'object' && value !== null
    && (('title' in value && typeof value.title === 'string') || (!('title' in value)))
    && (('subtitle' in value && typeof value.subtitle === 'string') || (!('subtitle' in value)))
    && (('image' in value && isImage(value.image)) || (!('image' in value)))
    && (('buttons' in value && Array.isArray(value.buttons) && value.buttons.every(isButton)) || (!('buttons' in value)))
    && (('ecommerce' in value && isEcommerce(value.ecommerce)) || (!('ecommerce' in value)));
};

const isRequestElement = (value: unknown): value is Element<RequestEcommerce> => {
  return isElement(value)
    && (('ecommerce' in value && isRequestEcommerce(value.ecommerce)) || (!('ecommerce' in value)));
};

const isImage = (value: unknown): value is Image => {
  return typeof value === 'object' && value !== null
    && 'url' in value && typeof value.url === 'string'
    && (('name' in value && typeof value.name === 'string') || (!('name' in value)))
    && (('content_type' in value && typeof value.content_type === 'string') || (!('content_type' in value)))
    && (('size' in value && typeof value.size === 'number') || (!('size' in value)))
    && (('width' in value && typeof value.width === 'number') || (!('width' in value)))
    && (('height' in value && typeof value.height === 'number') || (!('height' in value)))
    && (('alternative_text' in value && typeof value.alternative_text === 'string') || (!('alternative_text' in value)));
};

const isButton = (value: unknown): value is Button => {
  return typeof value === 'object' && value !== null
    && 'text' in value && typeof value.text === 'string'
    && 'type' in value && (value.type === 'webview' || value.type === 'message' || value.type === 'url' || value.type === 'phone')
    && 'value' in value && typeof value.value === 'string'
    && (('webview_height' in value && (value.webview_height === 'compact' || value.webview_height === 'full' || value.webview_height === 'tall')) || (!('webview_height' in value) && value.type !== 'webview'))
    && 'postback_id' in value && typeof value.postback_id === 'string'
    && 'user_ids' in value && Array.isArray(value.user_ids) && value.user_ids.every((userId: unknown) => typeof userId === 'string')
    && (('target' in value && (value.target === 'new' || value.target === 'current')) || (!('target' in value)));
};

const isEcommerce = (value: unknown): value is Ecommerce => {
  return typeof value === 'object' && value !== null
    && (('view_type' in value && isEcommerceViewType(value.view_type)) || (!('view_type' in value)))
    && (('product_id' in value && typeof value.product_id === 'string') || (!('product_id' in value)))
    && (('label' in value && typeof value.label === 'string') || (!('label' in value)))
    && (('options' in value && Array.isArray(value.options) && value.options.every(isOption)) || (!('options' in value)))
    && (('addons' in value && Array.isArray(value.addons) && value.addons.every(isAddon)) || (!('addons' in value)));
};

const isRequestEcommerce = (value: unknown): value is RequestEcommerce => {
  return isEcommerce(value)
    && 'view_type' in value && isEcommerceViewType(value.view_type)
    && 'product_id' in value && typeof value.product_id === 'string';
};

const isEcommerceViewType = (value: unknown): value is EcommerceViewType => {
  return value === 'tags' || value === 'swatch' || value === 'images' || value === 'select';
};

const isOption = (value: unknown): value is Option => {
  return typeof value === 'object' && value !== null
    && 'option_id' in value && typeof value.option_id === 'string'
    && 'label' in value && typeof value.label === 'string'
    && (('price' in value && typeof value.price === 'string') || (!('price' in value)))
    && (('regular_price' in value && typeof value.regular_price === 'string') || (!('regular_price' in value)))
    && (('currency' in value && typeof value.currency === 'string') || (!('currency' in value)))
    && (('color' in value && typeof value.color === 'string') || (!('color' in value)))
    && (('image_url' in value && typeof value.image_url === 'string') || (!('image_url' in value)))
    && (('image_thumbnail_url' in value && typeof value.image_thumbnail_url === 'string') || (!('image_thumbnail_url' in value)))
    && (('available' in value && typeof value.available === 'boolean') || (!('available' in value)))
    && (('selected' in value && typeof value.selected === 'boolean') || (!('selected' in value)));
};

const isAddon = (value: unknown): value is Addon => {
  return typeof value === 'object' && value !== null
    && 'addon_type' in value && typeof value.addon_type === 'string'
    && (('range_from' in value && typeof value.range_from === 'string') || (!('range_from' in value)))
    && (('range_to' in value && typeof value.range_to === 'string') || (!('range_to' in value)))
    && (('currency' in value && typeof value.currency === 'string') || (!('currency' in value)));
};
