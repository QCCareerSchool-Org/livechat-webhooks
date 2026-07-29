import { z } from 'zod';

export const fieldTypes = [ 'checkbox', 'email', 'name', 'question', 'subject', 'textarea', 'group_chooser', 'radio', 'select' ] as const;

export type FieldType = typeof fieldTypes[number];

export const fieldTypeSchema = z.enum(fieldTypes) satisfies z.ZodType<FieldType>;

export const isFieldType = (value: unknown): value is FieldType => {
  return fieldTypeSchema.safeParse(value).success;
};
