export type JobType = '개발자' | 'PO' | '디자이너';

export interface Record {
  id: string;
  name: string;
  address: string | null;
  memo: string | null;
  joinDate: string;
  job: JobType;
  emailConsent: boolean;
}
