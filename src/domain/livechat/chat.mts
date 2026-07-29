import type { Access } from './access.mjs';
import { isAccess } from './access.mjs';
import type { Properties } from './properties.mjs';
import { isProperties } from './properties.mjs';
import type { Thread } from './thread.mjs';
import { isThread } from './thread.mjs';
import type { User } from './user/index.mjs';
import { isUser } from './user/index.mjs';

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

export const isChat = (value: unknown): value is Chat => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && ((('threads' in value && Array.isArray(value.threads) && value.threads.every(isThread)) && (!('thread' in value)))
      || (('thread' in value && isThread(value.thread)) && (!('threads' in value))))
    && 'users' in value && Array.isArray(value.users) && value.users.every(isUser)
    && (('properties' in value && isProperties(value.properties)) || (!('properties' in value)))
    && (('access' in value && isAccess(value.access)) || (!('access' in value)))
    && 'is_followed' in value && typeof value.is_followed === 'boolean';
};
