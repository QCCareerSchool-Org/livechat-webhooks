/* eslint-disable camelcase */
import { isWebhookAction, isWebhookRequest, webhookRequestSchema } from './index.mjs';

describe('WebhookRequest', () => {

  describe('isWebhookAction', () => {

    test('detects a valid WebhookAction', () => {
      expect(isWebhookAction('incoming_chat')).toBe(true);
    });

    test('detects an invalid WebhookAction', () => {
      expect(isWebhookAction('invalid_action')).toBe(false);
    });

  });

  describe('isWebhookRequest', () => {

    test('detects a valid WebhookRequest', () => {
      expect(isWebhookRequest(validWebhookRequest)).toBe(true);
    });

    test('detects an invalid WebhookRequest', () => {
      expect(isWebhookRequest({ ...validWebhookRequest, webhook_id: 3 })).toBe(false);
    });

    test('describes an invalid WebhookRequest field', () => {
      const result = webhookRequestSchema.safeParse({ ...validWebhookRequest, webhook_id: 3 });

      expect(result.success).toBe(false);

      if (result.success) {
        throw new Error('Expected WebhookRequest validation to fail');
      }

      expect(result.error.issues[0]?.path).toEqual([ 'webhook_id' ]);
    });

  });
});

const validWebhookRequest = {
  webhook_id: '<webhook_id>',
  secret_key: '<secret_key>',
  action: 'incoming_chat',
  organization_id: '390e44e6-f1e6-0368c-z6ddb-74g14508c2ex',
  payload: {},
  additional_data: {
    chat_properties: {
      property_namespace: {
        property_name: 'property_value',
      },
    },
    chat_presence_user_ids: [ 'smith@example.com' ],
  },
};
