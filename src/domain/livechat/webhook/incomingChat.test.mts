/* eslint-disable camelcase */
import { isIncomingChat } from './incomingChat.mjs';

jest.mock('../chat.mjs', () => ({
  isChat: jest.fn(() => true),
}));

describe('IncomingChat', () => {

  describe('isIncomingChat', () => {

    test('detects a valid IncomingChat', () => {
      expect(isIncomingChat(validPayload)).toBe(true);
    });

    test('detects an invalid IncomingChat', () => {
      expect(isIncomingChat({ foo: 3 })).toBe(false);
    });

  });
});

const validPayload = {
  webhook_id: '<webhook_id>',
  secret_key: '<secret_key>',
  action: 'incoming_chat',
  organization_id: '390e44e6-f1e6-0368c-z6ddb-74g14508c2ex',
  payload: {
    chat: {},
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
