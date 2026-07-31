/* eslint-disable camelcase */
import { z } from 'zod';

export interface Queue {
  position: number;
  wait_time: number;
  /** ISO date string */
  queued_at: string;
}

export const queueSchema = z.looseObject({
  position: z.number().int(),
  wait_time: z.number().int(),
  queued_at: z.string(),
}) satisfies z.ZodType<Queue>;

export const isQueue = (value: unknown): value is Queue => {
  return queueSchema.safeParse(value).success;
};
