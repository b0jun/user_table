import { Record, Field } from '../types';

export const initialRecords: Record[] = [
  {
    id: '1',
    fields: {
      name: 'John Doe',
      address: '서울 강남구',
      memo: '외국인',
      joinDate: '2024-10-02',
      job: '개발자',
      emailConsent: true,
    },
  },
  {
    id: '2',
    fields: {
      name: 'Foo Bar',
      address: '서울 서초구',
      memo: '한국인',
      joinDate: '2024-10-01',
      job: 'PO',
      emailConsent: false,
    },
  },
];

export const defaultFields: Field[] = [
  {
    key: 'name',
    type: 'text',
    label: '이름',
    required: true,
    max: 20,
    width: 120,
  },
  {
    key: 'address',
    type: 'text',
    label: '주소',
    required: false,
    max: 20,
  },
  {
    key: 'memo',
    type: 'textarea',
    label: '메모',
    required: false,
    max: 50,
  },
  {
    key: 'joinDate',
    type: 'date',
    label: '가입일',
    required: true,
    width: 200,
  },
  {
    key: 'job',
    type: 'select',
    label: '직업',
    required: false,
    options: ['개발자', 'PO', '디자이너'],
  },
  {
    key: 'emailConsent',
    type: 'checkbox',
    label: '이메일 수신 동의',
    required: false,
    width: 150,
  },
];
