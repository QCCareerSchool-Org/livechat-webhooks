import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { compareHex } from './compareHex.mjs';
import { createSHA256Hash } from './createSHA256Hash.mjs';

export const verifySignature = (payload: Buffer, secretKey: string, signature: string): Result => {
  const computedSignature = createSHA256Hash(payload, secretKey);

  if (!compareHex(signature, computedSignature)) {
    return failure(Error('Signature mismatch'));
  }

  return success();
};
