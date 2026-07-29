import { z } from 'zod';

import type { CustomRequest, CustomResponse } from './custom.mjs';
import { customRequestSchema, customResponseSchema } from './custom.mjs';
import type { FileRequest, FileResponse } from './file.mjs';
import { fileRequestSchema, fileResponseSchema } from './file.mjs';
import type { FilledFormRequest, FilledFormResponse } from './filledForm.mjs';
import { filledFormRequestSchema, filledFormResponseSchema } from './filledForm.mjs';
import type { FormRequest, FormResponse } from './form.mjs';
import { formRequestSchema, formResponseSchema } from './form.mjs';
import type { MessageRequest, MessageResponse } from './message.mjs';
import { messageRequestSchema, messageResponseSchema } from './message.mjs';
import type { RichMessageRequest, RichMessageResponse } from './richMessage.mjs';
import { richMessageRequestSchema, richMessageResponseSchema } from './richMessage.mjs';
import type { SystemResponse } from './system.mjs';
import { systemResponseSchema } from './system.mjs';
import type { SystemMessageRequest, SystemMessageResponse } from './systemMessage.mjs';
import { systemMessageRequestSchema, systemMessageResponseSchema } from './systemMessage.mjs';

export type { BaseEventRequest, BaseEventResponse, EventType, Visibility } from './base.mjs';
export {
  baseEventRequestSchema,
  baseEventResponseSchema,
  createBaseEventRequestSchema,
  createBaseEventResponseSchema,
  eventTypeSchema,
  isBaseEventRequest,
  isBaseEventResponse,
  isEventType,
  visibilitySchema,
} from './base.mjs';
export type { CustomRequest, CustomResponse } from './custom.mjs';
export { customRequestSchema, customResponseSchema, isCustomRequest, isCustomResponse } from './custom.mjs';
export type { FileRequest, FileResponse } from './file.mjs';
export { fileRequestSchema, fileResponseSchema, isFileRequest, isFileResponse } from './file.mjs';
export type { FieldType } from './fieldType.mjs';
export { fieldTypeSchema, isFieldType } from './fieldType.mjs';
export type { FilledFormRequest, FilledFormResponse } from './filledForm.mjs';
export {
  filledFormRequestSchema,
  filledFormResponseSchema,
  isFilledFormRequest,
  isFilledFormResponse,
} from './filledForm.mjs';
export type { FormRequest, FormResponse } from './form.mjs';
export { formRequestSchema, formResponseSchema, isFormRequest, isFormResponse } from './form.mjs';
export type { MessageRequest, MessageResponse } from './message.mjs';
export { messageRequestSchema, messageResponseSchema, isMessageRequest, isMessageResponse } from './message.mjs';
export type { RichMessageRequest, RichMessageResponse } from './richMessage.mjs';
export {
  richMessageRequestSchema,
  richMessageResponseSchema,
  isRichMessageRequest,
  isRichMessageResponse,
} from './richMessage.mjs';
export type { SystemResponse } from './system.mjs';
export {
  aiAgentSystemSubtypeSchema,
  cdpSystemSubtypeSchema,
  isSystemResponse,
  messagingSystemSubtypeSchema,
  systemResponseSchema,
} from './system.mjs';
export type { SystemMessageRequest, SystemMessageResponse, SystemMessageType } from './systemMessage.mjs';
export {
  isSystemMessageRequest,
  isSystemMessageResponse,
  systemMessageRequestSchema,
  systemMessageResponseSchema,
  systemMessageTypeSchema,
} from './systemMessage.mjs';

export type EventRequest = FileRequest | FormRequest | FilledFormRequest | MessageRequest | RichMessageRequest | CustomRequest | SystemMessageRequest;

export type EventResponse = FileResponse | FormResponse | FilledFormResponse | MessageResponse | RichMessageResponse | CustomResponse | SystemMessageResponse | SystemResponse;

export const eventRequestSchema = z.discriminatedUnion('type', [
  fileRequestSchema,
  formRequestSchema,
  filledFormRequestSchema,
  messageRequestSchema,
  richMessageRequestSchema,
  customRequestSchema,
  systemMessageRequestSchema,
]) satisfies z.ZodType<EventRequest>;

export const eventResponseSchema = z.discriminatedUnion('type', [
  fileResponseSchema,
  formResponseSchema,
  filledFormResponseSchema,
  messageResponseSchema,
  richMessageResponseSchema,
  customResponseSchema,
  systemMessageResponseSchema,
  systemResponseSchema,
]) satisfies z.ZodType<EventResponse>;

export const isEventRequest = (value: unknown): value is EventRequest => {
  return eventRequestSchema.safeParse(value).success;
};

export const isEventResponse = (value: unknown): value is EventResponse => {
  return eventResponseSchema.safeParse(value).success;
};
