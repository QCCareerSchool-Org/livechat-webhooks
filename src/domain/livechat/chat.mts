/* eslint-disable camelcase */
import { z } from 'zod';

import type { Access } from './access.mjs';
import { accessSchema } from './access.mjs';
import type { Properties } from './properties.mjs';
import { propertiesSchema } from './properties.mjs';
import type { Thread } from './thread.mjs';
import { threadSchema } from './thread.mjs';
import type { User } from './user/index.mjs';
import { userSchema } from './user/index.mjs';

interface BaseChat {
  id: string;
  users: User[];
  properties?: Properties;
  access?: Access;
  is_followed: boolean;
}

export type Chat = BaseChat & ({
  threads: Thread[];
  thread?: never;
} | {
  threads?: never;
  thread: Thread;
});

const baseChatSchema = z.looseObject({
  id: z.string(),
  users: z.array(userSchema),
  properties: propertiesSchema.optional(),
  access: accessSchema.optional(),
  is_followed: z.boolean(),
}) satisfies z.ZodType<BaseChat>;

export const chatSchema = z.union([
  baseChatSchema.extend({
    threads: z.array(threadSchema),
    thread: z.never().optional(),
  }),
  baseChatSchema.extend({
    threads: z.never().optional(),
    thread: threadSchema,
  }),
]) satisfies z.ZodType<Chat>;

export const isChat = (value: unknown): value is Chat => {
  return chatSchema.safeParse(value).success;
};
