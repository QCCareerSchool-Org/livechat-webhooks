interface BaseAgent {
  id: string;
  type: 'agent';
  name: string;
  email: string;
  present: boolean;
  avatar: string;
}

export interface Agent extends BaseAgent {
  /** RFC 3339 date string */
  events_seen_up_to: string;
  visibility: 'all' | 'agents';
}

export interface MyProfile extends BaseAgent {
  /** RFC 3339 date string */
  events_seen_up_to?: string;
  routing_status?: string;
  permission: string;
}

export const isAgent = (value: unknown): value is Agent => {
  return isBaseAgent(value)
    && 'events_seen_up_to' in value && typeof value.events_seen_up_to === 'string'
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents');
};

export const isMyProfile = (value: unknown): value is MyProfile => {
  return isBaseAgent(value)
    && (('events_seen_up_to' in value && typeof value.events_seen_up_to === 'string') || (!('events_seen_up_to' in value)))
    && (('routing_status' in value && typeof value.routing_status === 'string') || (!('routing_status' in value)))
    && 'permission' in value && typeof value.permission === 'string';
};

const isBaseAgent = (value: unknown): value is BaseAgent => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'type' in value && value.type === 'agent'
    && 'name' in value && typeof value.name === 'string'
    && 'email' in value && typeof value.email === 'string'
    && 'present' in value && typeof value.present === 'boolean'
    && 'avatar' in value && typeof value.avatar === 'string';
};
