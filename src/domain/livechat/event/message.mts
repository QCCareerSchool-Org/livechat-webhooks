import type { Properties } from '../properties.mjs';
import { isProperties } from '../properties.mjs';

export interface MessageRequest {
  custom_id?: string;
  type: 'message';
  visibility?: 'all' | 'agents';
  /** Max. raw text size is 16 KB (one UTF-8 char like emoji 😁 can use up to 4 B); to send more, split text into several messages. */
  text: string;
  properties?: Properties;
  /** Indicates that the message event was generated in response to a rich message event. */
  postback?: PostBack;
}

export interface MessageResponse {
  id?: string;
  custom_id: string;
  /** ISO date string */
  created_at: string;
  type: 'message';
  author_id: string;
  visibility?: 'all' | 'agents';
  /** Max. raw text size is 16 KB (one UTF-8 char like emoji 😁 can use up to 4 B); to send more, split text into several messages. */
  text: string;
  properties?: Properties;
  /** Indicates that the message event was generated in response to a rich message event. */
  postback?: PostBack;
  /** Appears for deleted events, visible only to users with the administrator or viceowner role. */
  deleted?: boolean;
}

type PostBack = {
  /** ID of the postback from the rich message event. */
  id: string;
  /** ID of the thread with the rich message event. */
  thread_id: string;
  /** ID of the rich message event. */
  event_id: string;
  /** Object containing data specific to rich messages with ecommerce template, like product_id. */
  ecommerce?: Ecommerce;
} & ({
  /** Should be used together with postback.value (when one of them is present, the other is required). */
  type: never;
  /** Should be used together with postback.type (when one of them is present, the other is required). */
  value: never;
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

export const isMessageRequest = (value: unknown): value is MessageRequest => {
  return typeof value === 'object' && value !== null
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'message'
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)))
    && 'text' in value && typeof value.text === 'string'
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && (('postback' in value && isPostBack(value.postback)) || (!('postback' in value)));
};

export const isMessageResponse = (value: unknown): value is MessageResponse => {
  return typeof value === 'object' && value !== null
    && (('id' in value && typeof value.id === 'string') || (!('id' in value)))
    && 'custom_id' in value && typeof value.custom_id === 'string'
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'type' in value && value.type === 'message'
    && 'author_id' in value && typeof value.author_id === 'string'
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)))
    && 'text' in value && typeof value.text === 'string'
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && (('postback' in value && isPostBack(value.postback)) || (!('postback' in value)))
    && (('deleted' in value && typeof value.deleted === 'boolean') || (!('deleted' in value)));
};

const isPostBack = (value: unknown): value is PostBack => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'thread_id' in value && typeof value.thread_id === 'string'
    && 'event_id' in value && typeof value.event_id === 'string'
    && (('ecommerce' in value && isEcommerce(value.ecommerce)) || (!('ecommerce' in value)))
    && 'type' in value && typeof value.type === 'string'
    && 'value' in value && typeof value.value === 'string';
};

const isEcommerce = (value: unknown): value is Ecommerce => {
  return typeof value === 'object' && value !== null
    && (('product_id' in value && typeof value.product_id === 'string') || (!('product_id' in value)))
    && (('option_id' in value && typeof value.option_id === 'string') || (!('option_id' in value)))
    && (('quantity' in value && typeof value.quantity === 'number') || (!('quantity' in value)));
};
