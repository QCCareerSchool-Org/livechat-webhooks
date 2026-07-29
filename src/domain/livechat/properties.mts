import { z } from 'zod';

export type Properties = Record<string, Record<string, string>>;

export const propertiesSchema = z.record(
  z.string(),
  z.record(z.string(), z.string()),
) satisfies z.ZodType<Properties>;

export const isProperties = (value: unknown): value is Properties => {
  return propertiesSchema.safeParse(value).success;
};
