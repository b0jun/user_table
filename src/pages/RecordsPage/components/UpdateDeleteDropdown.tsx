import { Button, Dropdown, MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Record } from '../types';
import { useRecordActions } from '../context/RecordContext';

interface UpdateDeleteDropdownProps {
  record: Record;
}

export default function UpdateDeleteDropdown({ record }: UpdateDeleteDropdownProps) {
  const { deleteRecord } = useRecordActions();

  if (!record) {
    return null;
  }

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: '수정',
      onClick: () => {
        // TODO: 수정
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: '삭제',
      danger: true,
      onClick: () => deleteRecord(record.id),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ minWidth: '185px' }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}
