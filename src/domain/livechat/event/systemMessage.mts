const systemMessageTypes = [
  'agent_added',
  'agent_joined',
  'agent_left',
  'agent_removed',
  'archived_customer_disconnected',
  'chat_transferred',
  'customer_added',
  'customer_banned',
  'customer_removed',
  'customer_updated',
  'manual_archived_agent',
  'manual_archived_customer',
  'rating.chat_commented',
  'rating.chat_rated',
  'rating.chat_rating_canceled',
  'routing.archived_deleted',
  'routing.archived_disconnected',
  'routing.archived_inactive',
  'routing.archived_offline',
  'routing.archived_other',
  'routing.archived_remotely_signed_out',
  'routing.archived_signed_out',
  'routing.assigned_deleted',
  'routing.assigned_disconnected',
  'routing.assigned_inactive',
  'routing.assigned_other',
  'routing.assigned_remotely_signed_out',
  'routing.assigned_signed_out',
  'routing.idle',
  'routing.unassigned_deleted',
  'routing.unassigned_disconnected',
  'routing.unassigned_other',
  'routing.unassigned_remotely_signed_out',
  'routing.unassigned_signed_out',
  'system_archived',
  'transcript_requested',
  'transcript_sent',
] as const;

type SystemMessageType = typeof systemMessageTypes[number];

export interface SystemMessageRequest {
  custom_id?: string;
  type: 'system_message';
  text?: string;
  system_message_type: SystemMessageType;
  visibility?: 'all' | 'agents';
  text_vars?: Record<string, unknown>;
}

export interface SystemMessageResponse {
  id: string;
  custom_id?: string;
  type: 'system_message';
  /** ISO date string */
  created_at: string;
  text?: string;
  system_message_type: SystemMessageType;
  visibility: 'all' | 'agents';
  text_vars?: Record<string, unknown>;
}

export const isSystemMessageRequest = (value: unknown): value is SystemMessageRequest => {
  return typeof value === 'object' && value !== null
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'system_message'
    && (('text' in value && typeof value.text === 'string') || (!('text' in value)))
    && 'system_message_type' in value && isSystemMessageType(value.system_message_type)
    && (('visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')) || (!('visibility' in value)))
    && (('text_vars' in value && isTextVars(value.text_vars)) || (!('text_vars' in value)));
};

export const isSystemMessageResponse = (value: unknown): value is SystemMessageResponse => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'system_message'
    && 'created_at' in value && typeof value.created_at === 'string'
    && (('text' in value && typeof value.text === 'string') || (!('text' in value)))
    && 'system_message_type' in value && isSystemMessageType(value.system_message_type)
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents')
    && (('text_vars' in value && isTextVars(value.text_vars)) || (!('text_vars' in value)));
};

const isSystemMessageType = (value: unknown): value is SystemMessageType => {
  return typeof value === 'string' && (systemMessageTypes as readonly string[]).includes(value);
};

const isTextVars = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
