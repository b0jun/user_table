import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { StyledHeader, Title } from './recodeHeader.styles';

export default function RecordHeader() {
  return (
    <StyledHeader>
      <Title level={5}>회원 목록</Title>
      <Button type="primary" icon={<PlusOutlined />}>
        추가
      </Button>
    </StyledHeader>
  );
}
