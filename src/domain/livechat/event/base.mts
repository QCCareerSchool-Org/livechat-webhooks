const eventTypes = [ 'file', 'form', 'filled_form', 'message', 'rich_message', 'custom', 'system_message', 'system' ] as const;

export type EventType = typeof eventTypes[number];

export const isEventType = (value: unknown): value is EventType => {
  return typeof value === 'string' && (eventTypes as readonly string[]).includes(value);
};

export type Visibility = 'all' | 'agents';

export interface BaseEventRequest<Type extends EventType = EventType> {
  custom_id?: string;
  type: Type;
  visibility?: Visibility;
}

export interface BaseEventResponse<Type extends EventType = EventType> {
  id: string;
  custom_id?: string;
  type: Type;
  /** ISO date string */
  created_at: string;
  visibility: Visibility;
}

export const isBaseEventRequest = <Type extends EventType>(value: unknown, type: Type): value is BaseEventRequest<Type> => {
  return typeof value === 'object' && value !== null
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === type
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)));
};

export const isBaseEventResponse = <Type extends EventType>(value: unknown, type: Type): value is BaseEventResponse<Type> => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === type
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents');
};
