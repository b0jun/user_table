import { Record } from '../types';

export const initialRecords: Record[] = [
  {
    id: '1',
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    joinDate: '2024-10-02',
    job: '개발자',
    emailConsent: true,
  },
  {
    id: '2',
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    joinDate: '2024-10-01',
    job: 'PO',
    emailConsent: false,
  },
];
