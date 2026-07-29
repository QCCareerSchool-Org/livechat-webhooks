/* eslint-disable camelcase */
import {
  eventRequestSchema,
  eventResponseSchema,
  isEventRequest,
  isEventResponse,
  richMessageRequestSchema,
} from './index.mjs';

describe('Event', () => {

  describe('isEventRequest', () => {

    test.each([
      { type: 'file', url: 'https://cdn.livechat-files.com/file.png' },
      { type: 'form', form_id: 'form-id', fields: [] },
      { type: 'filled_form', form_id: 'form-id', fields: [] },
      { type: 'message', text: 'Hello' },
      { type: 'rich_message', template_id: 'cards' },
      { type: 'custom' },
      { type: 'system_message', system_message_type: 'agent_added' },
    ])('detects a valid $type request', event => {
      expect(isEventRequest(event)).toBe(true);
      expect(eventRequestSchema.safeParse(event).success).toBe(true);
    });

    test('detects an invalid request', () => {
      expect(isEventRequest({ type: 'message' })).toBe(false);
    });

  });

  describe('isEventResponse', () => {

    test.each([
      {
        id: 'event-id',
        type: 'file',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        author_id: 'author-id',
        name: 'file.png',
        url: 'https://cdn.livechat-files.com/file.png',
        content_type: 'image/png',
      },
      {
        id: 'event-id',
        type: 'form',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        author_id: 'author-id',
        form_id: 'form-id',
        fields: [],
      },
      {
        id: 'event-id',
        type: 'filled_form',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        author_id: 'author-id',
        form_id: 'form-id',
        fields: [],
      },
      {
        id: 'event-id',
        type: 'message',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        author_id: 'author-id',
        text: 'Hello',
      },
      {
        id: 'event-id',
        type: 'rich_message',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        author_id: 'author-id',
        template_id: 'cards',
      },
      {
        id: 'event-id',
        type: 'custom',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        author_id: 'author-id',
      },
      {
        id: 'event-id',
        type: 'system_message',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        system_message_type: 'agent_added',
      },
      {
        id: 'event-id',
        type: 'system',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        version: 1,
        details: 'Summary generated',
        source: 'messaging',
        subtype: 'summary',
      },
    ])('detects a valid $type response', event => {
      expect(isEventResponse(event)).toBe(true);
      expect(eventResponseSchema.safeParse(event).success).toBe(true);
    });

    test('detects an invalid response', () => {
      expect(isEventResponse({
        id: 'event-id',
        type: 'message',
        created_at: '2020-05-12T11:42:47.383000Z',
        visibility: 'all',
        author_id: 'author-id',
      })).toBe(false);
    });

  });

  test('describes an invalid nested event field', () => {
    const result = richMessageRequestSchema.safeParse({
      type: 'rich_message',
      template_id: 'ecommerce',
      elements: [
        {
          ecommerce: {
            view_type: 'select',
            product_id: 123,
          },
        },
      ],
    });

    expect(result.success).toBe(false);

    if (result.success) {
      throw new Error('Expected RichMessageRequest validation to fail');
    }

    expect(result.error.issues[0]?.path).toEqual([ 'elements', 0, 'ecommerce', 'product_id' ]);
  });

});
