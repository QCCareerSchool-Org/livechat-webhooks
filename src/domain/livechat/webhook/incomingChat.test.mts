/* eslint-disable camelcase */
import { incomingChatSchema, isIncomingChat } from './incomingChat.mjs';

describe('IncomingChat', () => {

  describe('isIncomingChat', () => {

    test('detects a valid IncomingChat', () => {
      expect(isIncomingChat(validPayload)).toBe(true);
    });

    test('detects an invalid IncomingChat', () => {
      expect(isIncomingChat({ foo: 3 })).toBe(false);
    });

    test('describes an invalid IncomingChat field', () => {
      const result = incomingChatSchema.safeParse({ ...validPayload, organization_id: 3 });

      expect(result.success).toBe(false);

      if (result.success) {
        throw new Error('Expected IncomingChat validation to fail');
      }

      expect(result.error.issues[0]?.path).toEqual([ 'organization_id' ]);
    });

  });
});

const validPayload = {
  webhook_id: '<webhook_id>',
  secret_key: '<secret_key>',
  action: 'incoming_chat',
  organization_id: '390e44e6-f1e6-0368c-z6ddb-74g14508c2ex',
  payload: {
    chat: {
      id: 'PJ0MRSHTDG',
      users: [],
      is_followed: false,
      thread: {
        id: 'QA37PVJ75B',
        created_at: '2020-05-12T11:42:47.383000Z',
        active: false,
        user_ids: [],
        events: [],
      },
    },
  },
  additional_data: {
    chat_properties: { // optional
      // chat properties
    },
    chat_presence_user_ids: [ // optional
      // User IDs
    ],
  },
};
