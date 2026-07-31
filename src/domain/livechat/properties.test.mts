/* eslint-disable camelcase */
import { isProperties } from './properties.mjs';

describe('Properties', () => {

  describe('isProperties', () => {

    test('detects valid Properties', () => {
      expect(isProperties(validProperties)).toBe(true);
    });

    test('detects invalid Properties', () => {
      expect(isProperties({ property_namespace: [ 3 ] })).toBe(false);
    });
  });
});

const validProperties = {
  property_namespace: {
    property_name: 'property_value',
  },
  foo: {
    bar: '5',
    baz: '98',
    qux: 'sdjfhkdsjhf',
  },
};
