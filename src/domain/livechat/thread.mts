import type { Access } from './access.mjs';
import { isAccess } from './access.mjs';
import type { EventResponse } from './event/index.mjs';
import { isEventResponse } from './event/index.mjs';
import type { Properties } from './properties.mjs';
import { isProperties } from './properties.mjs';

export interface Thread {
  id: string;
  /** ISO date string */
  created_at: string;
  active: boolean;
  user_ids: string[];
  events: EventResponse[];
  properties?: Properties;
  access?: Access;
  tags?: string[];
  previous_thread_id?: string;
}

export const isThread = (value: unknown): value is Thread => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'active' in value && typeof value.active === 'boolean'
    && 'user_ids' in value && Array.isArray(value.user_ids) && value.user_ids.every(userId => typeof userId === 'string')
    && 'events' in value && Array.isArray(value.events) && value.events.every(isEventResponse)
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && (('access' in value && isAccess(value.access)) || (!('access' in value)))
    && (('tags' in value && Array.isArray(value.tags) && value.tags.every(tag => typeof tag === 'string')) || (!('tags' in value)))
    && (('previous_thread_id' in value && typeof value.previous_thread_id === 'string') || (!('previous_thread_id' in value)));
};
