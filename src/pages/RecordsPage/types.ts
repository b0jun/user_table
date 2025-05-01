import { type Dayjs } from 'dayjs';

export type JobType = '개발자' | 'PO' | '디자이너';

export interface Record {
  id: string;
  name: string;
  address: string | null;
  memo: string | null;
  joinDate: string | null;
  job: JobType;
  emailConsent: boolean;
}

export type RecordFormType = Omit<Record, 'id' | 'joinDate'> & {
  joinDate: Dayjs | null;
};
