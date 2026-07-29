export interface Access {
  /** Group 0 means that all agents can see it. */
  group_ids: number[];
}

export const isAccess = (value: unknown): value is Access => {
  return typeof value === 'object' && value !== null
    && 'group_ids' in value && Array.isArray(value.group_ids) && value.group_ids.every(groupId => typeof groupId === 'number');
};
