export const fieldTypes = [ 'checkbox', 'email', 'name', 'question', 'subject', 'textarea', 'group_chooser', 'radio', 'select' ] as const;

export type FieldType = typeof fieldTypes[number];

export const isFieldType = (value: unknown): value is FieldType => {
  return typeof value === 'string' && (fieldTypes as readonly string[]).includes(value);
};
