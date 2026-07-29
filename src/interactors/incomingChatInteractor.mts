import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { IncomingChat } from '../domain/incomingChat.mjs';
import { postContact } from '../lib/activecampaign/contacts/post.mjs';

export const incomingChatInterator = async (incomingChat: IncomingChat): Promise<Result<bigint>> => {
  const user = incomingChat.users[0];
  if (!user) {
    return failure(Error('No user found.'));
  }

  if (!user.email) {
    return failure(Error('No email address.'));
  }

  const postContactResult = await postContact({
    email: user.email,
    firstName: user.name ?? '',
    lastName: '',
    phone: '',
  });

  if (!postContactResult.success) {
    return postContactResult;
  }

  return success(postContactResult.value);
};
