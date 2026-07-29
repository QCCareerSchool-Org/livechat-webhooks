/* eslint-disable camelcase */
import { z } from 'zod';

import type { Access } from './access.mjs';
import { accessSchema } from './access.mjs';
import type { EventResponse } from './event/index.mjs';
import { eventResponseSchema } from './event/index.mjs';
import type { Properties } from './properties.mjs';
import { propertiesSchema } from './properties.mjs';

export interface Thread {
  id: string;
  /** ISO date string */
  created_at: string;
  active: boolean;
  user_ids: string[];
  events: EventResponse[];
  properties?: Properties;
  access?: Access;
  tags?: string[];
  previous_thread_id?: string;
}

export const threadSchema = z.looseObject({
  id: z.string(),
  created_at: z.string(),
  active: z.boolean(),
  user_ids: z.array(z.string()),
  events: z.array(eventResponseSchema),
  properties: propertiesSchema.optional(),
  access: accessSchema.optional(),
  tags: z.array(z.string()).optional(),
  previous_thread_id: z.string().optional(),
}) satisfies z.ZodType<Thread>;

export const isThread = (value: unknown): value is Thread => {
  return threadSchema.safeParse(value).success;
};
