const actions = [ 'incoming_chat', 'chat_deactivated', 'chat_access_updated', 'chat_transferred', 'user_added_to_chat', 'user_removed_from_chat', 'incoming_event', 'event_deleted', 'event_updated', 'incoming_rich_message_postback', 'chat_properties_updated', 'chat_properties_deleted', 'thread_properties_deleted', 'thread_properties_updated', 'event_properties_updated', 'event_properties_deleted', 'thread_tagged', 'thread_untagged', 'routing_status_set', 'customer_session_fields_updated', 'agent_created', 'agent_approved', 'agent_updated', 'agent_suspended', 'agent_unsuspended', 'agent_deleted', 'auto_accesses_updated', 'bot_created', 'bot_updated', 'bot_deleted', 'group_created', 'group_updated', 'group_deleted', 'tag_created', 'tag_deleted', 'tag_updated', 'events_marked_as_seen', 'thread_summary_set' ] as const;

export type WebhookAction = typeof actions[number];

export const isWebhookAction = (value: unknown): value is WebhookAction => {
  return typeof value === 'string' && (actions as readonly string[]).includes(value);
};

export interface WebhookRequest {
  webhook_id: string;
  secret_key: string;
  action: WebhookAction;
  organization_id: string;
  payload: unknown;
  additional_data: AdditionalData;
  chat_presence_user_ids?: string[];
}

interface AdditionalData {
  chat_properties?: Record<string, string>;
};

export const isWebhookRequest = (value: unknown): value is WebhookRequest => {
  return typeof value === 'object' && value !== null
    && 'webhook_id' in value && typeof value.webhook_id === 'string'
    && 'secret_key' in value && typeof value.secret_key === 'string'
    && 'action' in value && isWebhookAction(value.action)
    && 'organization_id' in value && typeof value.organization_id === 'string'
    && 'payload' in value && typeof value.payload === 'object'
    && 'additional_data' in value && isAdditionalData(value.additional_data)
    && (('chat_presence_user_ids' in value && Array.isArray(value.chat_presence_user_ids) && value.chat_presence_user_ids.every(c => typeof c === 'string')) || !('chat_presence_user_ids' in value));
};

const isAdditionalData = (value: unknown): value is AdditionalData => {
  return typeof value === 'object' && value !== null
    && (('chat_properties' in value && typeof value.chat_properties === 'object' && value.chat_properties !== null) || !('chat_properties' in value));
};
