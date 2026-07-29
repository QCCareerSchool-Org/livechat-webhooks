/* eslint-disable camelcase */
import { isThread, threadSchema } from './thread.mjs';

describe('Thread', () => {

  describe('isThread', () => {

    test('detects a valid Thread', () => {
      expect(isThread(validThread)).toBe(true);
    });

    test('detects an invalid Thread', () => {
      expect(isThread({ ...validThread, active: 'false' })).toBe(false);
    });

    test('describes an invalid nested Thread field', () => {
      const result = threadSchema.safeParse({
        ...validThread,
        access: {
          group_ids: [ '0' ],
        },
      });

      expect(result.success).toBe(false);

      if (result.success) {
        throw new Error('Expected Thread validation to fail');
      }

      expect(result.error.issues[0]?.path).toEqual([ 'access', 'group_ids', 0 ]);
    });

  });
});

const validThread = {
  id: 'QA37PVJ75B',
  created_at: '2020-05-12T11:42:47.383000Z',
  active: false,
  user_ids: [
    'smith@example.com',
    'b7eff798-f8df-4364-8059-649c35c9ed0c',
  ],
  events: [
    {
      id: 'K600PKZON8',
      type: 'message',
      created_at: '2020-05-12T11:42:47.383000Z',
      visibility: 'all',
      author_id: 'b7eff798-f8df-4364-8059-649c35c9ed0c',
      text: 'Hello',
    },
  ],
  properties: {
    property_namespace: {
      property_name: 'property_value',
    },
  },
  access: {
    group_ids: [ 0 ],
  },
  tags: [ 'support' ],
  previous_thread_id: 'QA078URPJL',
};
