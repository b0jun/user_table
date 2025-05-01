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
import { Field, RecordFormType, Record } from '../types';
import { Checkbox, Form, Select } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { defaultFields } from '../lib/data';
import { Rule } from 'antd/es/form';
import { generateInitialValues } from '../utils/generateInitialValues';

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

const initialValues = generateInitialValues(defaultFields);

function RecordFormModal({ open, close, mode, record }: RecordFormModalProps) {
  const { addRecord, updateRecord } = useRecordActions();

  const [form] = Form.useForm<RecordFormType>();
  const values = Form.useWatch([], form);
  const isEditMode = mode === 'edit';
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // * Form 초기 설정
  useEffect(() => {
    if (isEditMode && record) {
      const formValues: RecordFormType = { fields: {} };
      defaultFields.forEach((field) => {
        const value = record.fields[field.key];
        if (field.type === 'date' && typeof value === 'string') {
          formValues.fields[field.key] = dayjs(value);
        } else {
          formValues.fields[field.key] = value ?? (field.required ? '' : null);
        }
      });
      form.setFieldsValue(formValues);
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

  const preprocessFormValues = (values: RecordFormType): Omit<Record, 'id'> => {
    const transformed: Omit<Record, 'id'> = { fields: {} };
    defaultFields.forEach((field) => {
      const value = values.fields[field.key];
      if (field.type === 'date' && value) {
        transformed.fields[field.key] = (value as Dayjs).format('YYYY-MM-DD');
      } else if (field.type === 'checkbox') {
        transformed.fields[field.key] = !!value;
      } else {
        transformed.fields[field.key] = (value as string | null) ?? null;
      }
    });
    return transformed;
  };

  const handleFinish = (values: RecordFormType) => {
    const newRecord = preprocessFormValues(values);
    if (isEditMode && record) {
      updateRecord({ ...newRecord, id: record.id });
    } else {
      addRecord(newRecord);
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

  const renderFieldInput = (field: Field) => {
    switch (field.type) {
      case 'text':
        return <StyledInput />;
      case 'textarea':
        return <StyledTextArea />;
      case 'date':
        return <StyledDatePicker showNow={false} format="YYYY-MM-DD" disabledDate={disabledDate} />;
      case 'select':
        return (
          <StyledSelect>
            {field.options?.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </StyledSelect>
        );
      case 'checkbox':
        return <Checkbox />;
      default:
        return null;
    }
  };

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
        {defaultFields.map((field) => {
          const rules: Rule[] = [];
          if (field.required) {
            rules.push({ required: true, message: `${field.label}을(를) 입력하세요.` });
          }
          if ('max' in field && field.max) {
            rules.push({
              max: field.max,
              message: `글자수 ${field.max} 초과할 수 없습니다.`,
            });
          }
          return (
            <Form.Item
              key={field.key}
              name={['fields', field.key]}
              label={field.label}
              rules={rules}
              valuePropName={field.type === 'checkbox' ? 'checked' : undefined}
            >
              {renderFieldInput(field)}
            </Form.Item>
          );
        })}
      </StyledForm>
    </StyledModal>
  );
}
