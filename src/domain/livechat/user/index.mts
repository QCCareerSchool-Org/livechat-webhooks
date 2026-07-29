import { z } from 'zod';

import type { Agent, MyProfile } from './agent.mjs';
import { agentSchema, myProfileSchema } from './agent.mjs';
import type { Customer } from './customer.mjs';
import { customerSchema } from './customer.mjs';

export type { Agent, MyProfile } from './agent.mjs';
export { agentSchema, isAgent, isMyProfile, myProfileSchema } from './agent.mjs';
export type { Customer } from './customer.mjs';
export { customerSchema, isCustomer } from './customer.mjs';

export type User = Agent | MyProfile | Customer;

export const userSchema = z.union([
  agentSchema,
  myProfileSchema,
  customerSchema,
]) satisfies z.ZodType<User>;

export const isUser = (value: unknown): value is User => {
  return userSchema.safeParse(value).success;
};
