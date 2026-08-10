import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { Chat } from '#domain/livechat/chat.mjs';
import type { Customer } from '#domain/livechat/user/customer.mjs';
import type { IncomingChat } from '#domain/livechat/webhook/incomingChat.mjs';
import { isSchoolName, type SchoolName } from '#domain/school.mjs';
import { createContact } from '#lib/activecampaign.mjs';
import { parseName } from '#lib/parseName.mjs';

export const incomingChatInterator = async (incomingChat: IncomingChat): Promise<Result> => {
  const customer = incomingChat.payload.chat.users.find(u => u.type === 'customer');
  if (!customer) {
    return failure(Error('No customter found.'));
  }

  if (!customer.email) {
    return failure(Error('No email address.'));
  }

  const emailOptIn = getEmailOptIn(incomingChat.payload.chat);
  const schoolName = getSchool(customer);

  if (!schoolName) {
    return failure(Error('Unable to determine school'));
  }

  const { firstName, lastName } = parseName(customer.name ?? '');

  const { requiredIds, optionalIds } = getAutomationIds(schoolName);

  const createContactResult = await createContact(
    customer.email,
    emailOptIn,
    false,
    schoolName,
    firstName,
    lastName,
    customer.last_visit?.geolocation?.country_code ?? 'US',
    undefined,
    customer.last_visit?.geolocation?.city,
    undefined,
    requiredIds,
    optionalIds,
    'Chat',
  );

  if (!createContactResult.success) {
    return createContactResult;
  }

  return success(createContactResult.value);
};

const getEmailOptIn = (chat: Chat) => {
  const events = [
    ...chat.thread?.events ?? [],
    ...chat.threads?.flatMap(t => t.events) ?? [],
  ];

  const filledForm = events.find(e => e.type === 'filled_form');

  if (!filledForm) {
    return false;
  }

  const optInField = filledForm.fields.find(f => f.type === 'checkbox' && f.label === 'opt_in');
  if (!optInField) {
    return false;
  }

  return 'answer' in optInField && optInField.answer === 'yes';
};

const getSchool = (customer: Customer): SchoolName | undefined => {
  if (!customer.session_fields) {
    return;
  }

  const school = customer.session_fields.find(s => 'school' in s)?.school;
  if (!school) {
    return;
  }

  if (isSchoolName(school)) {
    return school;
  }
};

const getAutomationIds = (schoolName: SchoolName): { requiredIds: bigint[]; optionalIds: bigint[] } => {
  switch (schoolName) {
    case 'QC Design School':
      return { requiredIds: [], optionalIds: [] };
    case 'QC Event School':
      return { requiredIds: [], optionalIds: [] };
    case 'QC Makeup Academy':
      return { requiredIds: [], optionalIds: [] };
    case 'QC Pet Studies':
      return { requiredIds: [], optionalIds: [] };
    case 'QC Wellness Studies':
      return { requiredIds: [], optionalIds: [] };
    default:
      return { requiredIds: [], optionalIds: [] };
  }
};
