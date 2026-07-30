/* eslint-disable camelcase */
import { success } from 'generic-result-type';

import type { IncomingChat } from '#domain/livechat/webhook/incomingChat.mjs';
import { postContact } from '#lib/activecampaign/contacts/post.mjs';
import { incomingChatInterator } from './incomingChatInteractor.mjs';

jest.mock('#lib/activecampaign/contacts/post.mjs', () => ({
  postContact: jest.fn(),
}));

const mockedPostContact = jest.mocked(postContact);

describe('incomingChatInterator', () => {

  beforeEach(() => {
    mockedPostContact.mockReset();
  });

  test('posts a contact based on the customer in the IncomingChat', async () => {
    mockedPostContact.mockResolvedValue(success(123n));

    const result = await incomingChatInterator(incomingChat);

    expect(mockedPostContact).toHaveBeenCalledTimes(1);
    expect(mockedPostContact).toHaveBeenCalledWith({
      email: 'thomas.anderson@example.com',
      firstName: 'Thomas',
      lastName: 'Anderson',
      phone: '',
    });
    expect(result).toMatchObject({
      success: true,
      value: 123n,
    });
  });

});

const incomingChat = {
  webhook_id: 'webhook-id',
  secret_key: 'secret-key',
  action: 'incoming_chat',
  organization_id: 'organization-id',
  payload: {
    chat: {
      id: 'PJ0MRSHTDG',
      users: [
        {
          id: 'b7eff798-f8df-4364-8059-649c35c9ed0c',
          type: 'customer',
          name: 'Thomas Anderson',
          email: 'thomas.anderson@example.com',
        },
      ],
      is_followed: false,
      threads: [],
    },
  },
  additional_data: {},
} satisfies IncomingChat;
