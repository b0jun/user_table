import { Field, RecordFormType } from '../types';

export function generateInitialValues(fields: Field[]): RecordFormType {
  const initialValues: RecordFormType = {
    fields: {},
  };

  fields.forEach((field) => {
    switch (field.type) {
      case 'text':
      case 'textarea':
        initialValues.fields[field.key] = field.required ? '' : null;
        break;
      case 'date':
        initialValues.fields[field.key] = null;
        break;
      case 'select':
        initialValues.fields[field.key] = field.options && field.options.length > 0 ? field.options[0] : null;
        break;
      case 'checkbox':
        initialValues.fields[field.key] = false;
        break;
    }
  });

  return initialValues;
}
