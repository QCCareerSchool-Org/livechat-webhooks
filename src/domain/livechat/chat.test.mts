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

    test('detects a valid Chat with one thread', () => {
      expect(isChat(actualChat)).toBe(true);
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

const actualChat = {
  id: 'TJ7KGBJ21G',
  users: [
    {
      id: '22a0dc3c-f11e-42ba-aeeb-11dd810eb621',
      name: 'Dave Welsh',
      email: 'dave@qccareerschool.com',
      present: true,
      last_seen_timestamp: 1786379272,
      type: 'customer',
      session_fields: [ { school: 'QC Design School' } ],
      created_at: '2026-08-10T16:27:52.607369Z',
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
        started_at: '2026-08-10T16:27:47.000000Z',
        last_pages: [
          {
            opened_at: '2026-08-10T16:27:47.000000Z',
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
      agent_last_event_created_at: '2026-08-10T16:27:52.610010Z',
      customer_last_event_created_at: '2026-08-10T16:27:52.609011Z',
    },
    {
      id: 'info@qccareerschool.com',
      name: 'Arnold',
      email: 'info@qccareerschool.com',
      present: true,
      last_seen_timestamp: 0,
      type: 'agent',
      avatar: 'https://cdn.files-text.com/api/accounts/avatars/e638848d-0520-4c0e-be78-12446edf4e4f/d09c4f69-801f-4d54-9ed0-9dd2508776c9/069d2129-6dd1-406c-aeda-e3d6191bf289.jpeg',
      routing_status: 'accepting_chats',
      visibility: 'all',
    },
  ],
  thread: {
    id: 'TJ7KGBJ22G',
    created_at: '2026-08-10T16:27:52.608000Z',
    active: true,
    properties: {
      routing: {
        continuous: true,
        group_status_at_start: 'online',
        idle: false,
        pinned: true,
        start_url: 'https://www.qcdesignschool.com/',
        unassigned: false,
      },
      source: {
        client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
        customer_client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
      },
    },
    user_ids: [
      '22a0dc3c-f11e-42ba-aeeb-11dd810eb621',
      'info@qccareerschool.com',
    ],
    events: [
      {
        id: 'TJ7KGBJ22G_1',
        custom_id: 'e4y8h100x9w',
        visibility: 'all',
        created_at: '2026-08-10T16:27:52.609011Z',
        author_id: '22a0dc3c-f11e-42ba-aeeb-11dd810eb621',
        properties: {
          lc2: { form_type: 'prechat' },
          source: { client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5' },
        },
        type: 'filled_form',
        form_id: '1786378078697897275',
        form_type: 'prechat',
        fields: [
          {
            id: '1786378078697897277',
            label: 'Name:',
            type: 'name',
            answer: 'Dave Welsh',
          },
          {
            id: '1786378078697897278',
            label: 'Email Address:',
            type: 'email',
            answer: 'dave@qccareerschool.com',
          },
          {
            id: '1786378078697897279',
            label: 'Email Opt-In',
            type: 'checkbox',
            options: [
              {
                id: 0,
                value: 'I’d like to receive occasional emails from QC Design School',
              },
            ],
          },
        ],
      },
      {
        id: 'TJ7KGBJ22G_2',
        custom_id: '',
        visibility: 'all',
        created_at: '2026-08-10T16:27:52.610010Z',
        author_id: 'info@qccareerschool.com',
        properties: {
          chats: { welcome_message_source: 'welcome_phrase' },
          lc2: { welcome_message: true },
        },
        type: 'message',
        text: 'Hello. How may I help you?',
      },
    ],
    access: { group_ids: [ 2 ] },
  },
  properties: {
    routing: { continuous: true, email_follow_up: true, pinned: true },
    source: {
      client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
      customer_client_id: 'c5e4f61e1a6c3b1521b541bc5c5a2ac5',
    },
  },
  access: { group_ids: [ 2 ] },
};
