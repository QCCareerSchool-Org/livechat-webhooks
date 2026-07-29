/* eslint-disable camelcase */
import { customerSchema, isCustomer } from './customer.mjs';

describe('Customer', () => {

  describe('isCustomer', () => {

    test('detects a valid Customer', () => {
      expect(isCustomer(validCustomer)).toBe(true);
    });

    test('detects an invalid Customer', () => {
      expect(isCustomer(invalidCustomer)).toBe(false);
    });

    test('describes an invalid nested Customer field', () => {
      const result = customerSchema.safeParse(invalidCustomer);

      expect(result.success).toBe(false);

      if (result.success) {
        throw new Error('Expected Customer validation to fail');
      }

      expect(result.error.issues[0]?.path).toEqual([ 'visit', 'last_pages', 0, 'title' ]);
    });

  });
});

const validCustomer = {
  id: 'b7eff798-f8df-4364-8059-649c35c9ed0c',
  type: 'customer',
  name: 'Thomas Anderson',
  visit: {
    started_at: '2020-05-12T11:32:03.497479Z',
    geolocation: {
      country: 'Poland',
      city: 'Wroclaw',
    },
  },
  statistics: {
    chats_count: 1,
    threads_count: 3,
    visits_count: 6,
    tickets_count: 12,
  },
  customer_properties: {
    '550e8400-e29b-41d4-a716-446655440000': {
      value: 42,
      last_updated_at: '2026-06-11T12:00:00Z',
    },
  },
};

const invalidCustomer = {
  id: 'b7eff798-f8df-4364-8059-649c35c9ed0c',
  type: 'customer',
  visit: {
    started_at: '2020-05-12T11:32:03.497479Z',
    last_pages: [
      {
        opened_at: '2020-05-12T11:32:03.497479Z',
        url: 'https://example.com',
        title: 42,
      },
    ],
  },
};
