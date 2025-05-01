import { useMemo, useEffect, useState } from 'react';
import { useModalOverlay } from '../../../hooks/useModalOverlay';
import { useRecordActions } from '../context/RecordContext';
import {
  StyledModal,
  StyledForm,
  StyledInput,
  StyledTextArea,
  StyledDatePicker,
  StyledSelect,
  RequiredMark,
} from './recordFormModal.styles';
import { Record, RecordFormType } from '../types';
import { Checkbox, Form, Select } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';

type FormMode = 'add' | 'edit';

export function useRecordFormModal() {
  const overlay = useModalOverlay();

  return useMemo(
    () => ({
      open: (mode: FormMode, record?: Record) =>
        overlay.open(({ isOpen, close }) => (
          <RecordFormModal open={isOpen} close={close} mode={mode} record={record} />
        )),
      close: overlay.close,
    }),
    [overlay],
  );
}

const { Option } = Select;

interface RecordFormModalProps {
  open: boolean;
  close: () => void;
  mode: FormMode;
  record?: Record;
}

const initialValues = {
  name: '',
  address: null,
  memo: null,
  joinDate: null,
  job: '개발자',
  emailConsent: false,
};

function RecordFormModal({ open, close, mode, record }: RecordFormModalProps) {
  const { addRecord, updateRecord } = useRecordActions();

  const [form] = Form.useForm<RecordFormType>();
  const values = Form.useWatch([], form);
  const isEditMode = mode === 'edit' && record;
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // * Form 초기 설정
  useEffect(() => {
    if (isEditMode && record) {
      form.setFieldsValue({
        name: record.name,
        address: record.address ?? null,
        memo: record.memo ?? null,
        joinDate: record.joinDate ? dayjs(record.joinDate) : null,
        job: record.job,
        emailConsent: record.emailConsent,
      });
    } else {
      form.resetFields();
    }
  }, [isEditMode, record, form]);

  // * 유효성 체크
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsFormValid(true))
      .catch(() => setIsFormValid(false));
  }, [form, values]);

  const handleFinish = (values: RecordFormType) => {
    const finalValues = {
      ...values,
      joinDate: dayjs(values.joinDate).format('YYYY-MM-DD'),
      address: values.address || null,
      memo: values.memo || null,
    };
    if (isEditMode && record) {
      updateRecord({ ...finalValues, id: record.id });
    } else {
      addRecord(finalValues);
    }
    form.resetFields();
    close();
  };

  // * 오늘 이후 날짜 비활성화
  const disabledDate = (current: Dayjs) => {
    return current && current.isAfter(dayjs(), 'day');
  };

  // * 마커 오른쪽 표기용
  const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
    <RequiredMark>
      {label}
      {required && <span>*</span>}
    </RequiredMark>
  );

  return (
    <StyledModal
      title="회원 추가"
      open={open}
      onCancel={close}
      onOk={() => {
        form.submit();
      }}
      okText="저장"
      cancelText="취소"
      width={520}
      okButtonProps={{ disabled: !isFormValid }}
    >
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginBottom: 16 }}
        requiredMark={customizeRequiredMark}
        {...(!isEditMode && {
          initialValues,
        })}
      >
        <Form.Item
          name="name"
          label="이름"
          rules={[
            { required: true, message: '이름을 입력하세요.' },
            { max: 20, message: '글자수 20을 초과할 수 없습니다.' },
          ]}
        >
          <StyledInput />
        </Form.Item>
        <Form.Item name="address" label="주소" rules={[{ max: 20, message: '글자수 20을 초과할 수 없습니다.' }]}>
          <StyledInput />
        </Form.Item>
        <Form.Item name="memo" label="메모" rules={[{ max: 50, message: '글자수 50을 초과할 수 없습니다.' }]}>
          <StyledTextArea />
        </Form.Item>
        <Form.Item name="joinDate" label="가입일" rules={[{ required: true, message: '가입일을 선택하세요.' }]}>
          <StyledDatePicker showNow={false} format="YYYY-MM-DD" disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item name="job" label="직업">
          <StyledSelect>
            <Option value="개발자">개발자</Option>
            <Option value="PO">PO</Option>
            <Option value="디자이너">디자이너</Option>
          </StyledSelect>
        </Form.Item>
        <Form.Item name="emailConsent" label="이메일 수신 동의" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </StyledForm>
    </StyledModal>
  );
}
