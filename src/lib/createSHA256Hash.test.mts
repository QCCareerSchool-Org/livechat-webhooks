import { createSHA256Hash } from './createSHA256Hash.mjs';

describe('createSHA256Hash', () => {

  it('should produce a proper hash', () => {
    if (!process.env.HMAC_SECRET_KEY) {
      throw Error('Environment variable HMAC_SECRET_KEY not set');
    }

    const buf = Buffer.from('3f8a9c1d72e4b5a0c6d1f92b8e47a3c59d0e4a7b1c6f82d5e93a04b7c1f6d8a2e5b9c0471a6d3f82c9e0b5a7d14f6c93', 'hex');
    const signature = '3dfbc9cccb026748a618394d501b8049255e4171ba4304338ff383d61ce0b2ea';
    const result = createSHA256Hash(buf, process.env.HMAC_SECRET_KEY);

    expect(result).toBe(signature);
  });
});
