/* eslint-disable camelcase */
import { z } from 'zod';

export interface Customer {
  id: string;
  type: 'customer';
  name?: string;
  email?: string;
  email_verified?: boolean;
  avatar?: string;
  phone_number?: string;
  visit?: Visit;
  session_fields?: Record<string, string>[];
  statistics?: Statistics;
  __priv_lc2_customer_id?: string;
  /** ISO date string */
  agent_last_event_created_at?: string;
  /** ISO date string */
  customer_last_event_created_at?: string;
  /** ISO date string */
  created_at?: string;
  present?: boolean;
  /** RFC 3339 date string */
  events_seen_up_to?: string;
  followed?: boolean;
  online?: boolean;
  group_ids?: number[];
  tickets?: Ticket[];
  state?: string;
  carts?: Cart[];
  omnichannel?: Omnichannel;
  address?: Address;
  customer_properties?: Record<string, CustomerProperty>;
}

interface Visit {
  /** ISO date string */
  started_at: string;
  /** ISO date string */
  ended_at?: string;
  referrer?: string;
  ip?: string;
  user_agent?: string;
  geolocation?: Geolocation;
  last_pages?: Page[];
}

interface Geolocation {
  country?: string;
  country_code?: string;
  region?: string;
  city?: string;
  timezone?: string;
  latitude?: string;
  longitude?: string;
}

interface Page {
  /** ISO date string */
  opened_at: string;
  url: string;
  title: string;
}

interface Statistics {
  chats_count: number;
  threads_count: number;
  visits_count: number;
  tickets_count: number;
  page_views_count?: number;
  greetings_shown_count?: number;
  greetings_accepted_count?: number;
}

interface Ticket {
  ticket_id: string;
  /** ISO date string */
  created_at: string;
}

interface Cart {
  store_uuid: string;
  store_platform: string;
  customer_signed_in: boolean;
  subtotal: number;
  total: number;
  subtotal_usd: number;
  total_usd: number;
  currency: string;
  items: CartItem[];
  /** RFC 3339 date string */
  last_updated_at: string;
}

interface CartItem {
  id: number;
  quantity: number;
  variant_id: number;
}

interface Omnichannel {
  fb_messenger?: FacebookMessengerIdentity[];
  twilio?: TwilioIdentity[];
  whatsapp?: WhatsAppIdentity[];
}

interface FacebookMessengerIdentity {
  ID: string;
  Name: string;
  FirstName: string;
  LastName: string;
  ProfilePicURL: string;
  Gender: string;
  Locale: string;
  IsVerifiedUser: boolean;
}

type TwilioIdentity = Record<string, {
  phone_number: string;
}>;

interface WhatsAppIdentity {
  ID: string;
  Name: string;
  PhoneNumber: string;
}

interface Address {
  address?: string;
  city?: string;
  country?: string;
  state?: string;
  postal_code?: string;
}

interface CustomerProperty {
  value: unknown;
  /** RFC 3339 date string */
  last_updated_at: string;
  last_updated_agent_account_id?: string;
  last_updated_agent_client_id?: string;
}

const geolocationSchema = z.looseObject({
  country: z.string().optional(),
  country_code: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  timezone: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
}) satisfies z.ZodType<Geolocation>;

const pageSchema = z.looseObject({
  opened_at: z.string(),
  url: z.string(),
  title: z.string(),
}) satisfies z.ZodType<Page>;

const visitSchema = z.looseObject({
  started_at: z.string(),
  ended_at: z.string().optional(),
  referrer: z.string().optional(),
  ip: z.string().optional(),
  user_agent: z.string().optional(),
  geolocation: geolocationSchema.optional(),
  last_pages: z.array(pageSchema).optional(),
}) satisfies z.ZodType<Visit>;

const sessionFieldSchema = z.record(
  z.string(),
  z.string(),
) satisfies z.ZodType<Record<string, string>>;

const statisticsSchema = z.looseObject({
  chats_count: z.number(),
  threads_count: z.number(),
  visits_count: z.number(),
  tickets_count: z.number(),
  page_views_count: z.number().optional(),
  greetings_shown_count: z.number().optional(),
  greetings_accepted_count: z.number().optional(),
}) satisfies z.ZodType<Statistics>;

const ticketSchema = z.looseObject({
  ticket_id: z.string(),
  created_at: z.string(),
}) satisfies z.ZodType<Ticket>;

const cartItemSchema = z.looseObject({
  id: z.number(),
  quantity: z.number(),
  variant_id: z.number(),
}) satisfies z.ZodType<CartItem>;

const cartSchema = z.looseObject({
  store_uuid: z.string(),
  store_platform: z.string(),
  customer_signed_in: z.boolean(),
  subtotal: z.number(),
  total: z.number(),
  subtotal_usd: z.number(),
  total_usd: z.number(),
  currency: z.string(),
  items: z.array(cartItemSchema),
  last_updated_at: z.string(),
}) satisfies z.ZodType<Cart>;

const facebookMessengerIdentitySchema = z.looseObject({
  ID: z.string(),
  Name: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  ProfilePicURL: z.string(),
  Gender: z.string(),
  Locale: z.string(),
  IsVerifiedUser: z.boolean(),
}) satisfies z.ZodType<FacebookMessengerIdentity>;

const twilioPhoneSchema = z.looseObject({
  phone_number: z.string(),
}) satisfies z.ZodType<{ phone_number: string }>;

const twilioIdentitySchema = z.record(
  z.string(),
  twilioPhoneSchema,
) satisfies z.ZodType<TwilioIdentity>;

const whatsAppIdentitySchema = z.looseObject({
  ID: z.string(),
  Name: z.string(),
  PhoneNumber: z.string(),
}) satisfies z.ZodType<WhatsAppIdentity>;

const omnichannelSchema = z.looseObject({
  fb_messenger: z.array(facebookMessengerIdentitySchema).optional(),
  twilio: z.array(twilioIdentitySchema).optional(),
  whatsapp: z.array(whatsAppIdentitySchema).optional(),
}) satisfies z.ZodType<Omnichannel>;

const addressSchema = z.looseObject({
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
}) satisfies z.ZodType<Address>;

const customerPropertySchema = z.looseObject({
  value: z.unknown(),
  last_updated_at: z.string(),
  last_updated_agent_account_id: z.string().optional(),
  last_updated_agent_client_id: z.string().optional(),
}) satisfies z.ZodType<CustomerProperty>;

const customerPropertiesSchema = z.record(
  z.string(),
  customerPropertySchema,
) satisfies z.ZodType<Record<string, CustomerProperty>>;

export const customerSchema = z.looseObject({
  id: z.string(),
  type: z.literal('customer'),
  name: z.string().optional(),
  email: z.string().optional(),
  email_verified: z.boolean().optional(),
  avatar: z.string().optional(),
  phone_number: z.string().optional(),
  visit: visitSchema.optional(),
  session_fields: z.array(sessionFieldSchema).optional(),
  statistics: statisticsSchema.optional(),
  __priv_lc2_customer_id: z.string().optional(),
  agent_last_event_created_at: z.string().optional(),
  customer_last_event_created_at: z.string().optional(),
  created_at: z.string().optional(),
  present: z.boolean().optional(),
  events_seen_up_to: z.string().optional(),
  followed: z.boolean().optional(),
  online: z.boolean().optional(),
  group_ids: z.array(z.number()).optional(),
  tickets: z.array(ticketSchema).optional(),
  state: z.string().optional(),
  carts: z.array(cartSchema).optional(),
  omnichannel: omnichannelSchema.optional(),
  address: addressSchema.optional(),
  customer_properties: customerPropertiesSchema.optional(),
}) satisfies z.ZodType<Customer>;

export const isCustomer = (value: unknown): value is Customer => {
  return customerSchema.safeParse(value).success;
};
