import type { Agent, MyProfile } from './agent.mjs';
import { isAgent, isMyProfile } from './agent.mjs';
import type { Customer } from './customer.mjs';
import { isCustomer } from './customer.mjs';

export type { Agent, MyProfile } from './agent.mjs';
export { isAgent, isMyProfile } from './agent.mjs';
export type { Customer } from './customer.mjs';
export { isCustomer } from './customer.mjs';

export type User = Agent | MyProfile | Customer;

export const isUser = (value: unknown): value is User => {
  return isAgent(value) || isMyProfile(value) || isCustomer(value);
};
