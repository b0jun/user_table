import { type Dayjs } from 'dayjs';

export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';

export type Field =
  | {
      key: string;
      type: 'text' | 'textarea';
      label: string;
      required: boolean;
      max?: number;
      width?: number;
    }
  | {
      key: string;
      type: 'date';
      label: string;
      required: boolean;
      width?: number;
    }
  | {
      key: string;
      type: 'select';
      label: string;
      required: boolean;
      options: string[];
      width?: number;
    }
  | {
      key: string;
      type: 'checkbox';
      label: string;
      required: boolean;
      width?: number;
    };

interface FieldData {
  [key: string]: string | boolean | null;
}
interface FormFieldData {
  [key: string]: string | boolean | Dayjs | null;
}

export interface Record {
  id: string;
  fields: FieldData;
}
export interface RecordFormType {
  fields: FormFieldData;
}
