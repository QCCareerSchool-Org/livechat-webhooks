const aiAgentSystemSubtypes = [
  'custom_skill_awaiting_feedback',
  'custom_skill_completed',
  'custom_skill_failed',
  'custom_skill_rejected',
  'custom_skill_started',
] as const;

type AiAgentSystemSubtype = typeof aiAgentSystemSubtypes[number];

const cdpSystemSubtypes = [
  'store_order_was_created',
  'store_product_added_to_cart',
  'store_product_removed_from_cart',
] as const;

type CdpSystemSubtype = typeof cdpSystemSubtypes[number];

const messagingSystemSubtypes = [ 'summary' ] as const;

type MessagingSystemSubtype = typeof messagingSystemSubtypes[number];

interface SystemResponseBase {
  id: string;
  custom_id?: string;
  type: 'system';
  version: number;
  details: string;
  /** ISO date string */
  created_at: string;
  visibility: 'all' | 'agents';
}

type SystemActivity = {
  source: 'ai_agents';
  subtype: AiAgentSystemSubtype;
} | {
  source: 'cdp';
  subtype: CdpSystemSubtype;
} | {
  source: 'messaging';
  subtype: MessagingSystemSubtype;
};

export type SystemResponse = SystemResponseBase & SystemActivity;

export const isSystemResponse = (value: unknown): value is SystemResponse => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && (('custom_id' in value && typeof value.custom_id === 'string') || (!('custom_id' in value)))
    && 'type' in value && value.type === 'system'
    && isSystemActivity(value)
    && 'version' in value && typeof value.version === 'number'
    && 'details' in value && typeof value.details === 'string'
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'visibility' in value && (value.visibility === 'all' || value.visibility === 'agents');
};

const isSystemActivity = (value: unknown): value is SystemActivity => {
  return typeof value === 'object' && value !== null
    && 'source' in value
    && 'subtype' in value
    && ((value.source === 'ai_agents' && isAiAgentSystemSubtype(value.subtype))
      || (value.source === 'cdp' && isCdpSystemSubtype(value.subtype))
      || (value.source === 'messaging' && isMessagingSystemSubtype(value.subtype)));
};

const isAiAgentSystemSubtype = (value: unknown): value is AiAgentSystemSubtype => {
  return typeof value === 'string' && (aiAgentSystemSubtypes as readonly string[]).includes(value);
};

const isCdpSystemSubtype = (value: unknown): value is CdpSystemSubtype => {
  return typeof value === 'string' && (cdpSystemSubtypes as readonly string[]).includes(value);
};

const isMessagingSystemSubtype = (value: unknown): value is MessagingSystemSubtype => {
  return typeof value === 'string' && (messagingSystemSubtypes as readonly string[]).includes(value);
};
