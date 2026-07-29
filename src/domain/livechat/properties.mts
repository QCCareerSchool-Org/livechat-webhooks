export type Properties = Record<string, Record<string, string>>;

export const isProperties = (value: unknown): value is Properties => {
  return typeof value === 'object' && value !== null
    && Object.values(value).every(namespace => typeof namespace === 'object' && namespace !== null && !Array.isArray(namespace)
      && Object.values(namespace as Record<string, unknown>).every(property => typeof property === 'string'));
};
