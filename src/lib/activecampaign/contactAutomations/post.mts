import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { stringify } from '#src/lib/json.mjs';
import { activeCampaignFetch } from '../index.mjs';

export enum ContactListStatus {
  ACTIVE = 1,
  UNSUBSCRIBED = 2,
};

interface ContactAutomation {
  contact: bigint;
  automation: bigint;
}

export const postContactAutomations = async (contactAutomation: ContactAutomation, signal: AbortSignal | null = null): Promise<Result> => {
  try {
    const body = { contactAutomation };

    const response = await activeCampaignFetch('/contactAutomations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringify(body),
      signal,
    });

    if (!response.ok) {
      return failure(Error(response.statusText));
    }

    if (response.status !== 201) {
      return failure(Error('Failed to add contact to automation'));
    }

    return success();
  } catch (err) {
    if (!signal?.aborted) {
      console.error(err);
    }
    return failure(err instanceof Error ? err : Error(String(err)));
  }
};
