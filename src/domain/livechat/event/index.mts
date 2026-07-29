import type { CustomRequest, CustomResponse } from './custom.mjs';
import { isCustomRequest, isCustomResponse } from './custom.mjs';
import type { FileRequest, FileResponse } from './file.mjs';
import { isFileRequest, isFileResponse } from './file.mjs';
import type { FilledFormRequest, FilledFormResponse } from './filledForm.mjs';
import { isFilledFormRequest, isFilledFormResponse } from './filledForm.mjs';
import type { FormRequest, FormResponse } from './form.mjs';
import { isFormRequest, isFormResponse } from './form.mjs';
import type { MessageRequest, MessageResponse } from './message.mjs';
import { isMessageRequest, isMessageResponse } from './message.mjs';
import type { RichMessageRequest, RichMessageResponse } from './richMessage.mjs';
import { isRichMessageRequest, isRichMessageResponse } from './richMessage.mjs';
import type { SystemResponse } from './system.mjs';
import { isSystemResponse } from './system.mjs';
import type { SystemMessageRequest, SystemMessageResponse } from './systemMessage.mjs';
import { isSystemMessageRequest, isSystemMessageResponse } from './systemMessage.mjs';

export type { BaseEventRequest, BaseEventResponse, EventType, Visibility } from './base.mjs';
export { isBaseEventRequest, isBaseEventResponse, isEventType } from './base.mjs';
export type { CustomRequest, CustomResponse } from './custom.mjs';
export { isCustomRequest, isCustomResponse } from './custom.mjs';
export type { FileRequest, FileResponse } from './file.mjs';
export { isFileRequest, isFileResponse } from './file.mjs';
export type { FilledFormRequest, FilledFormResponse } from './filledForm.mjs';
export { isFilledFormRequest, isFilledFormResponse } from './filledForm.mjs';
export type { FormRequest, FormResponse } from './form.mjs';
export { isFormRequest, isFormResponse } from './form.mjs';
export type { MessageRequest, MessageResponse } from './message.mjs';
export { isMessageRequest, isMessageResponse } from './message.mjs';
export type { RichMessageRequest, RichMessageResponse } from './richMessage.mjs';
export { isRichMessageRequest, isRichMessageResponse } from './richMessage.mjs';
export type { SystemResponse } from './system.mjs';
export { isSystemResponse } from './system.mjs';
export type { SystemMessageRequest, SystemMessageResponse } from './systemMessage.mjs';
export { isSystemMessageRequest, isSystemMessageResponse } from './systemMessage.mjs';

export type EventRequest = FileRequest | FormRequest | FilledFormRequest | MessageRequest | RichMessageRequest | CustomRequest | SystemMessageRequest;

export type EventResponse = FileResponse | FormResponse | FilledFormResponse | MessageResponse | RichMessageResponse | CustomResponse | SystemMessageResponse | SystemResponse;

export const isEventRequest = (value: unknown): value is EventRequest => {
  return isFileRequest(value) ||
  isFormRequest(value) ||
  isFilledFormRequest(value) ||
  isMessageRequest(value) ||
  isRichMessageRequest(value) ||
  isCustomRequest(value) ||
  isSystemMessageRequest(value);
};

export const isEventResponse = (value: unknown): value is EventResponse => {
  return isFileResponse(value) ||
  isFormResponse(value) ||
  isFilledFormResponse(value) ||
  isMessageResponse(value) ||
  isRichMessageResponse(value) ||
  isCustomResponse(value) ||
  isSystemMessageResponse(value) ||
  isSystemResponse(value);
};
