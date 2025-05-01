import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { StyledHeader, Title } from './recodeHeader.styles';
import { useRecordActions, useRecordState } from '../context/RecordContext';
import { useRecordFormModal } from '../hooks/useRecordFormModal';

export default function RecordHeader() {
  const { selectedRowKeys } = useRecordState();
  const { deleteSelectedRecords } = useRecordActions();
  const { open } = useRecordFormModal();
  return (
    <StyledHeader>
      <Space size={8}>
        <Title level={5}>회원 목록</Title>
        {selectedRowKeys.length > 0 && (
          <Button danger onClick={deleteSelectedRecords} style={{ marginBottom: 16 }}>
            선택된 {selectedRowKeys.length}개 삭제
          </Button>
        )}
      </Space>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => open('add')}>
        추가
      </Button>
    </StyledHeader>
  );
}
