/* eslint-disable camelcase */
import type { IncomingChat } from './incomingChat.mjs';
import { incomingChatSchema, isIncomingChat } from './incomingChat.mjs';

describe('IncomingChat', () => {

  describe('isIncomingChat', () => {

    test('detects a valid IncomingChat', () => {
      expect(isIncomingChat(realPayload)).toBe(true);
    });

    test('detects an invalid IncomingChat', () => {
      expect(isIncomingChat({ foo: 3 })).toBe(false);
    });

    test('describes an invalid IncomingChat field', () => {
      const result = incomingChatSchema.safeParse({ ...realPayload, organization_id: 3 });

      expect(result.success).toBe(false);

      if (result.success) {
        throw new Error('Expected IncomingChat validation to fail');
      }

      expect(result.error.issues[0]?.path).toEqual([ 'organization_id' ]);
    });

  });
});

const realPayload: IncomingChat = {
  webhook_id: '2cd0122d-f5ac-447d-8106-94e7b405b66d',
  secret_key: '32948729347239847293847239847',
  action: 'incoming_chat',
  organization_id: 'e638848d-0520-4c0e-be78-12446edf4e4f',
  payload: {
    chat: {
      id: 'TJ21JN1AEZ',
      users: [
        {
          id: 'cd322d29-bf40-4a92-8a8c-1c4e6a46335f',
          name: 'Dave Welsh',
          email: 'dave@qccareerschool.com',
          present: true,
          last_seen_timestamp: 1785508667,
          type: 'customer',
          session_fields: [ { school: 'QC Design School' } ],
          created_at: '2026-07-31T14:37:47.577633Z',
          last_visit: {
            ip: '142.126.189.195',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            geolocation: {
              country: 'Canada',
              country_code: 'CA',
              region: 'Ontario',
              city: 'Ottawa',
              timezone: 'America/Toronto',
            },
            started_at: '2026-07-31T14:37:43.000000Z',
            last_pages: [
              {
                opened_at: '2026-07-31T14:37:43.000000Z',
                url: 'https://www.qcdesignschool.com/',
                title: 'QC Design School',
              },
            ],
          },
          statistics: {
            visits_count: 0,
            threads_count: 1,
            chats_count: 1,
            page_views_count: 0,
            greetings_accepted_count: 0,
            greetings_converted_count: 0,
          },
          agent_last_event_created_at: '1970-01-01T00:00:00.000000Z',
          customer_last_event_created_at: '2026-07-31T14:37:47.581001Z',
        },
      ],
      thread: {
        id: 'TJ21JN1AFZ',
        created_at: '2026-07-31T14:37:47.580000Z',
        active: true,
        properties: {
          routing: {
            continuous: true,
            group_status_at_start: 'online_for_queue',
            idle: false,
            last_transfer_timestamp: 1785508667,
            pinned: true,
            start_url: 'https://www.qcdesignschool.com/',
            unassigned: true,
          },
          source: {
            client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
            customer_client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
          },
        },
        user_ids: [ 'cd322d29-bf40-4a92-8a8c-1c4e6a46335f' ],
        events: [
          {
            id: 'TJ21JN1AFZ_1',
            custom_id: 'g1aukiidx8m',
            visibility: 'all',
            created_at: '2026-07-31T14:37:47.581001Z',
            author_id: 'cd322d29-bf40-4a92-8a8c-1c4e6a46335f',
            properties: {
              lc2: { form_type: 'prechat' },
              source: { client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5' },
            },
            type: 'filled_form',
            form_id: '178534697381759174',
            form_type: 'prechat',
            fields: [
              {
                id: '178534697381759176',
                label: 'Name:',
                type: 'name',
                answer: 'Dave Welsh',
              },
              {
                id: '178534697381759177',
                label: 'E-mail:',
                type: 'email',
                answer: 'dave@qccareerschool.com',
              },
            ],
          },
        ],
        access: { group_ids: [ 2 ] },
        queue: {
          position: 1,
          wait_time: 330,
          queued_at: '2026-07-31T14:37:47.581912Z',
        },
      },
      properties: {
        routing: { continuous: true, email_follow_up: true, pinned: true },
        source: {
          client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
          customer_client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
        },
      },
      access: { group_ids: [ 2 ] },
    },
  },
  additional_data: {},
};
