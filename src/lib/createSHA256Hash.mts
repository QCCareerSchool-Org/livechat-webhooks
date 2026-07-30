import type { BinaryLike } from 'crypto';
import crypto from 'crypto';

export const createSHA256Hash = (input: BinaryLike, secretKey: string) => {
  return crypto.createHmac('sha256', secretKey).update(input).digest('hex');
};
