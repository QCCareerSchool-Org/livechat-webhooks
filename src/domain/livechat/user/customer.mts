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

export const isCustomer = (value: unknown): value is Customer => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'type' in value && value.type === 'customer'
    && (('name' in value && typeof value.name === 'string') || (!('name' in value)))
    && (('email' in value && typeof value.email === 'string') || (!('email' in value)))
    && (('email_verified' in value && typeof value.email_verified === 'boolean') || (!('email_verified' in value)))
    && (('avatar' in value && typeof value.avatar === 'string') || (!('avatar' in value)))
    && (('phone_number' in value && typeof value.phone_number === 'string') || (!('phone_number' in value)))
    && (('visit' in value && isVisit(value.visit)) || (!('visit' in value)))
    && (('session_fields' in value && Array.isArray(value.session_fields) && value.session_fields.every(isSessionField)) || (!('session_fields' in value)))
    && (('statistics' in value && isStatistics(value.statistics)) || (!('statistics' in value)))
    && (('__priv_lc2_customer_id' in value && typeof value.__priv_lc2_customer_id === 'string') || (!('__priv_lc2_customer_id' in value)))
    && (('agent_last_event_created_at' in value && typeof value.agent_last_event_created_at === 'string') || (!('agent_last_event_created_at' in value)))
    && (('customer_last_event_created_at' in value && typeof value.customer_last_event_created_at === 'string') || (!('customer_last_event_created_at' in value)))
    && (('created_at' in value && typeof value.created_at === 'string') || (!('created_at' in value)))
    && (('present' in value && typeof value.present === 'boolean') || (!('present' in value)))
    && (('events_seen_up_to' in value && typeof value.events_seen_up_to === 'string') || (!('events_seen_up_to' in value)))
    && (('followed' in value && typeof value.followed === 'boolean') || (!('followed' in value)))
    && (('online' in value && typeof value.online === 'boolean') || (!('online' in value)))
    && (('group_ids' in value && Array.isArray(value.group_ids) && value.group_ids.every((groupId: unknown) => typeof groupId === 'number')) || (!('group_ids' in value)))
    && (('tickets' in value && Array.isArray(value.tickets) && value.tickets.every(isTicket)) || (!('tickets' in value)))
    && (('state' in value && typeof value.state === 'string') || (!('state' in value)))
    && (('carts' in value && Array.isArray(value.carts) && value.carts.every(isCart)) || (!('carts' in value)))
    && (('omnichannel' in value && isOmnichannel(value.omnichannel)) || (!('omnichannel' in value)))
    && (('address' in value && isAddress(value.address)) || (!('address' in value)))
    && (('customer_properties' in value && isCustomerProperties(value.customer_properties)) || (!('customer_properties' in value)));
};

const isVisit = (value: unknown): value is Visit => {
  return typeof value === 'object' && value !== null
    && 'started_at' in value && typeof value.started_at === 'string'
    && (('ended_at' in value && typeof value.ended_at === 'string') || (!('ended_at' in value)))
    && (('referrer' in value && typeof value.referrer === 'string') || (!('referrer' in value)))
    && (('ip' in value && typeof value.ip === 'string') || (!('ip' in value)))
    && (('user_agent' in value && typeof value.user_agent === 'string') || (!('user_agent' in value)))
    && (('geolocation' in value && isGeolocation(value.geolocation)) || (!('geolocation' in value)))
    && (('last_pages' in value && Array.isArray(value.last_pages) && value.last_pages.every(isPage)) || (!('last_pages' in value)));
};

const isGeolocation = (value: unknown): value is Geolocation => {
  return typeof value === 'object' && value !== null
    && (('country' in value && typeof value.country === 'string') || (!('country' in value)))
    && (('country_code' in value && typeof value.country_code === 'string') || (!('country_code' in value)))
    && (('region' in value && typeof value.region === 'string') || (!('region' in value)))
    && (('city' in value && typeof value.city === 'string') || (!('city' in value)))
    && (('timezone' in value && typeof value.timezone === 'string') || (!('timezone' in value)))
    && (('latitude' in value && typeof value.latitude === 'string') || (!('latitude' in value)))
    && (('longitude' in value && typeof value.longitude === 'string') || (!('longitude' in value)));
};

const isPage = (value: unknown): value is Page => {
  return typeof value === 'object' && value !== null
    && 'opened_at' in value && typeof value.opened_at === 'string'
    && 'url' in value && typeof value.url === 'string'
    && 'title' in value && typeof value.title === 'string';
};

const isSessionField = (value: unknown): value is Record<string, string> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    && Object.values(value).every(field => typeof field === 'string');
};

const isStatistics = (value: unknown): value is Statistics => {
  return typeof value === 'object' && value !== null
    && 'chats_count' in value && typeof value.chats_count === 'number'
    && 'threads_count' in value && typeof value.threads_count === 'number'
    && 'visits_count' in value && typeof value.visits_count === 'number'
    && 'tickets_count' in value && typeof value.tickets_count === 'number'
    && (('page_views_count' in value && typeof value.page_views_count === 'number') || (!('page_views_count' in value)))
    && (('greetings_shown_count' in value && typeof value.greetings_shown_count === 'number') || (!('greetings_shown_count' in value)))
    && (('greetings_accepted_count' in value && typeof value.greetings_accepted_count === 'number') || (!('greetings_accepted_count' in value)));
};

const isTicket = (value: unknown): value is Ticket => {
  return typeof value === 'object' && value !== null
    && 'ticket_id' in value && typeof value.ticket_id === 'string'
    && 'created_at' in value && typeof value.created_at === 'string';
};

const isCart = (value: unknown): value is Cart => {
  return typeof value === 'object' && value !== null
    && 'store_uuid' in value && typeof value.store_uuid === 'string'
    && 'store_platform' in value && typeof value.store_platform === 'string'
    && 'customer_signed_in' in value && typeof value.customer_signed_in === 'boolean'
    && 'subtotal' in value && typeof value.subtotal === 'number'
    && 'total' in value && typeof value.total === 'number'
    && 'subtotal_usd' in value && typeof value.subtotal_usd === 'number'
    && 'total_usd' in value && typeof value.total_usd === 'number'
    && 'currency' in value && typeof value.currency === 'string'
    && 'items' in value && Array.isArray(value.items) && value.items.every(isCartItem)
    && 'last_updated_at' in value && typeof value.last_updated_at === 'string';
};

const isCartItem = (value: unknown): value is CartItem => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'number'
    && 'quantity' in value && typeof value.quantity === 'number'
    && 'variant_id' in value && typeof value.variant_id === 'number';
};

const isOmnichannel = (value: unknown): value is Omnichannel => {
  return typeof value === 'object' && value !== null
    && (('fb_messenger' in value && Array.isArray(value.fb_messenger) && value.fb_messenger.every(isFacebookMessengerIdentity)) || (!('fb_messenger' in value)))
    && (('twilio' in value && Array.isArray(value.twilio) && value.twilio.every(isTwilioIdentity)) || (!('twilio' in value)))
    && (('whatsapp' in value && Array.isArray(value.whatsapp) && value.whatsapp.every(isWhatsAppIdentity)) || (!('whatsapp' in value)));
};

const isFacebookMessengerIdentity = (value: unknown): value is FacebookMessengerIdentity => {
  return typeof value === 'object' && value !== null
    && 'ID' in value && typeof value.ID === 'string'
    && 'Name' in value && typeof value.Name === 'string'
    && 'FirstName' in value && typeof value.FirstName === 'string'
    && 'LastName' in value && typeof value.LastName === 'string'
    && 'ProfilePicURL' in value && typeof value.ProfilePicURL === 'string'
    && 'Gender' in value && typeof value.Gender === 'string'
    && 'Locale' in value && typeof value.Locale === 'string'
    && 'IsVerifiedUser' in value && typeof value.IsVerifiedUser === 'boolean';
};

const isTwilioIdentity = (value: unknown): value is TwilioIdentity => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    && Object.values(value).every(phone => typeof phone === 'object' && phone !== null && !Array.isArray(phone)
      && 'phone_number' in phone && typeof (phone as Record<string, unknown>).phone_number === 'string');
};

const isWhatsAppIdentity = (value: unknown): value is WhatsAppIdentity => {
  return typeof value === 'object' && value !== null
    && 'ID' in value && typeof value.ID === 'string'
    && 'Name' in value && typeof value.Name === 'string'
    && 'PhoneNumber' in value && typeof value.PhoneNumber === 'string';
};

const isAddress = (value: unknown): value is Address => {
  return typeof value === 'object' && value !== null
    && (('address' in value && typeof value.address === 'string') || (!('address' in value)))
    && (('city' in value && typeof value.city === 'string') || (!('city' in value)))
    && (('country' in value && typeof value.country === 'string') || (!('country' in value)))
    && (('state' in value && typeof value.state === 'string') || (!('state' in value)))
    && (('postal_code' in value && typeof value.postal_code === 'string') || (!('postal_code' in value)));
};

const isCustomerProperties = (value: unknown): value is Record<string, CustomerProperty> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    && Object.values(value).every(isCustomerProperty);
};

const isCustomerProperty = (value: unknown): value is CustomerProperty => {
  return typeof value === 'object' && value !== null
    && 'value' in value
    && 'last_updated_at' in value && typeof value.last_updated_at === 'string'
    && (('last_updated_agent_account_id' in value && typeof value.last_updated_agent_account_id === 'string') || (!('last_updated_agent_account_id' in value)))
    && (('last_updated_agent_client_id' in value && typeof value.last_updated_agent_client_id === 'string') || (!('last_updated_agent_client_id' in value)));
};
