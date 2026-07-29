/* eslint-disable camelcase */
import { accessSchema, isAccess } from './access.mjs';

describe('Access', () => {

  describe('isAccess', () => {

    test('detects valid Access', () => {
      expect(isAccess({ group_ids: [ 0, 1 ] })).toBe(true);
    });

    test('detects invalid Access', () => {
      expect(isAccess({ group_ids: [ '0' ] })).toBe(false);
    });

    test('describes invalid Access', () => {
      const result = accessSchema.safeParse({ group_ids: [ '0' ] });

      expect(result.success).toBe(false);

      if (result.success) {
        throw new Error('Expected Access validation to fail');
      }

      expect(result.error.issues[0]?.path).toEqual([ 'group_ids', 0 ]);
    });

  });
});
