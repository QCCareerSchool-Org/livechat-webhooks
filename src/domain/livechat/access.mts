/* eslint-disable camelcase */
import { z } from 'zod';

export interface Access {
  /** Group 0 means that all agents can see it. */
  group_ids: number[];
}

export const accessSchema = z.looseObject({
  group_ids: z.array(z.number()),
}) satisfies z.ZodType<Access>;

export const isAccess = (value: unknown): value is Access => {
  return accessSchema.safeParse(value).success;
};
