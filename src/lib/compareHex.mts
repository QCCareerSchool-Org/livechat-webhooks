import { timingSafeEqual } from 'node:crypto';

export const compareHex = (aHex: string, bHex: string): boolean => {
  const aBuf = Buffer.from(aHex, 'hex');
  const bBuf = Buffer.from(bHex, 'hex');

  if (aBuf.length !== bBuf.length) {
    return false;
  }

  try {
    return timingSafeEqual(aBuf, bBuf);
  } catch (err) {
    console.error(err instanceof Error ? err : Error(String(err)));
    return false;
  }
};
