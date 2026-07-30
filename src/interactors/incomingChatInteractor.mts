import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { IncomingChat } from '#domain/livechat/webhook/incomingChat.mjs';
import { postContact } from '#lib/activecampaign/contacts/post.mjs';
import { parseName } from '#lib/parseName.mjs';

export const incomingChatInterator = async (incomingChat: IncomingChat): Promise<Result<bigint>> => {
  const customer = incomingChat.payload.chat.users.find(u => u.type === 'customer');
  if (!customer) {
    return failure(Error('No customter found.'));
  }

  if (!customer.email) {
    return failure(Error('No email address.'));
  }

  const { firstName, lastName } = parseName(customer.name ?? '');

  const postContactResult = await postContact({
    email: customer.email,
    firstName,
    lastName,
    phone: '',
  });

  if (!postContactResult.success) {
    return postContactResult;
  }

  return success(postContactResult.value);
};
