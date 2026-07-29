/* eslint-disable camelcase */
import { agentSchema, isAgent, isMyProfile } from './agent.mjs';

describe('Agent', () => {

  describe('isAgent', () => {

    test('detects a valid Agent', () => {
      expect(isAgent(validAgent)).toBe(true);
    });

    test('detects an invalid Agent', () => {
      expect(isAgent({ ...validAgent, visibility: 'customers' })).toBe(false);
    });

    test('describes an invalid Agent field', () => {
      const result = agentSchema.safeParse({ ...validAgent, visibility: 'customers' });

      expect(result.success).toBe(false);

      if (result.success) {
        throw new Error('Expected Agent validation to fail');
      }

      expect(result.error.issues[0]?.path).toEqual([ 'visibility' ]);
    });

  });

  describe('isMyProfile', () => {

    test('detects a valid MyProfile', () => {
      expect(isMyProfile(validMyProfile)).toBe(true);
    });

    test('detects an invalid MyProfile', () => {
      expect(isMyProfile({ ...validMyProfile, permission: 3 })).toBe(false);
    });

  });
});

const baseAgent = {
  id: 'smith@example.com',
  type: 'agent',
  name: 'Agent Smith',
  email: 'smith@example.com',
  present: true,
  avatar: 'https://example.com/avatar.png',
};

const validAgent = {
  ...baseAgent,
  events_seen_up_to: '2020-05-12T12:31:46.999999Z',
  visibility: 'all',
};

const validMyProfile = {
  ...baseAgent,
  routing_status: 'accepting_chats',
  permission: 'administrator',
};
