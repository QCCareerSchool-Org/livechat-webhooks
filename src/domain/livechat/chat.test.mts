/* eslint-disable camelcase */
import { chatSchema, isChat } from './chat.mjs';

describe('Chat', () => {

  describe('isChat', () => {

    test('detects a valid Chat with threads', () => {
      expect(isChat(validChatWithThreads)).toBe(true);
    });

    test('detects a valid Chat with one thread', () => {
      expect(isChat(validChatWithThread)).toBe(true);
    });

    test('rejects a Chat with both thread shapes', () => {
      expect(isChat({
        ...validChatWithThreads,
        thread: validThread,
      })).toBe(false);
    });

    test('detects an invalid nested Chat field', () => {
      const result = chatSchema.safeParse({
        ...validChatWithThread,
        access: {
          group_ids: [ '0' ],
        },
      });

      expect(result.success).toBe(false);
    });

  });
});

const validThread = {
  id: 'QA37PVJ75B',
  created_at: '2020-05-12T11:42:47.383000Z',
  active: false,
  user_ids: [ 'b7eff798-f8df-4364-8059-649c35c9ed0c' ],
  events: [],
};

const baseChat = {
  id: 'PJ0MRSHTDG',
  users: [
    {
      id: 'b7eff798-f8df-4364-8059-649c35c9ed0c',
      type: 'customer',
      name: 'Thomas Anderson',
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
  is_followed: true,
};

const validChatWithThreads = {
  ...baseChat,
  threads: [ validThread ],
};

const validChatWithThread = {
  ...baseChat,
  thread: validThread,
};
