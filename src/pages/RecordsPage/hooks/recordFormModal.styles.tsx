import styled from 'styled-components';
import { Modal, Form, Input, DatePicker, Select, FormProps } from 'antd';
import { RecordFormType } from '../types';

const { TextArea } = Input;

export const StyledModal = styled(Modal)`
  && {
    .ant-modal-content {
      padding: 12px 0;
      box-shadow: 0px 9px 28px 8px #0000000d;
    }

    .ant-modal-header {
      padding: 0 16px 12px;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 10px;
    }

    .ant-modal-title {
      font-size: 14px;
      line-height: 22px;
    }

    .ant-modal-close {
      width: 22px;
      height: 22px;
    }

    .ant-modal-footer {
      border-top: 1px solid #0000000f;
      display: flex;
      justify-content: flex-end;
      background-color: #00000005;
      padding: 12px 16px 0;
    }
  }
`;

export const StyledForm = styled(Form)<FormProps<RecordFormType>>`
  && {
    .ant-form-item {
      padding: 0 24px;
      margin-bottom: 20px;
    }

    .ant-form-item-label > label {
      color: #00000073;
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
    }

    .ant-form-item-explain-error {
      font-size: 12px;
      line-height: 18px;
    }
    .ant-form-item-control-input {
      min-height: 0;
    }
  }
  &&& {
    .ant-form-item-label {
      min-height: 40px;
      padding: 0;
      display: flex;
      align-items: center;
    }
  }
`;

export const RequiredMark = styled.div`
  display: flex;
  gap: 4px;

  & > span {
    font-size: 16px;
    font-weight: 400;
    color: #ff4d4f;
  }
`;

export const StyledInput = styled(Input)`
  && {
    height: 32px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    border-radius: 8px;
    padding: 0 12px;
    border: 1px solid #e3e3e3;
  }
`;

export const StyledTextArea = styled(TextArea)`
  && {
    height: 64px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    border-radius: 10px;
    padding: 5px 12px;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  && {
    width: 162px;
    height: 32px;
    border-radius: 8px;
    padding: 0 12px;

    .ant-picker-input > input {
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
    }
  }
`;

export const StyledSelect = styled(Select)`
  && {
    width: 100px;
    .ant-select-selector {
      height: 32px;
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
      border-radius: 8px;
    }

    .ant-select-arrow {
      color: #000000e0;
    }
  }
`;
