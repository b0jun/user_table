import { Checkbox } from 'antd';
import { FilterDropdownMenu, FilterMenuItem, FilterMenuItemContent, StyledTable } from './recordTable.styles';
import { useRecordActions, useRecordState } from '../context/RecordContext';
import { Record } from '../types';
import UpdateDeleteDropdown from './UpdateDeleteDropdown';
import { type FilterDropdownProps } from 'antd/es/table/interface';

export default function RecordTable() {
  const { records, selectedRowKeys } = useRecordState();
  const { setSelectedRowKeys } = useRecordActions();

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const getColumnFilterProps = (dataIndex: keyof Record, records: Record[]) => {
    // * 레코드에서 고유 값 추출
    const uniqueValues = Array.from(
      new Set(records.map((record) => record[dataIndex]).filter((value) => value !== null)),
    );
    const filterOptions = uniqueValues.map((value) => ({
      label: typeof value === 'boolean' ? (value ? '선택됨' : '선택 안함') : value,
      value: value.toString(),
    }));

    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
      }: Pick<FilterDropdownProps, 'setSelectedKeys' | 'selectedKeys' | 'confirm'>) => (
        <FilterDropdownMenu role="menu">
          {filterOptions.map((option) => (
            <FilterMenuItem
              key={option.value}
              role="menuitem"
              selected={selectedKeys.includes(option.value)}
              onClick={() => {
                const newSelectedKeys = selectedKeys.includes(option.value)
                  ? selectedKeys.filter((key: React.Key) => key !== option.value)
                  : [...selectedKeys, option.value];
                setSelectedKeys(newSelectedKeys);
                confirm({ closeDropdown: false });
              }}
            >
              <FilterMenuItemContent>
                <Checkbox
                  checked={selectedKeys.includes(option.value)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const newSelectedKeys = e.target.checked
                      ? [...selectedKeys, option.value]
                      : selectedKeys.filter((key: React.Key) => key !== option.value);
                    setSelectedKeys(newSelectedKeys);
                    confirm({ closeDropdown: false });
                  }}
                />
                {option.label}
              </FilterMenuItemContent>
            </FilterMenuItem>
          ))}
        </FilterDropdownMenu>
      ),
      onFilter: (value: React.Key | boolean, record: Record) => {
        const fieldValue = record[dataIndex];
        // * Email(boolean)
        if (typeof fieldValue === 'boolean') {
          return fieldValue.toString() === value.toString();
        }
        return fieldValue?.toString() === value.toString();
      },
    };
  };

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ...getColumnFilterProps('name', records),
    },
    {
      title: '주소',
      dataIndex: 'address',
      key: 'address',
      ...getColumnFilterProps('address', records),
    },
    {
      title: '메모',
      dataIndex: 'memo',
      key: 'memo',
      ...getColumnFilterProps('memo', records),
    },
    {
      title: '가입일',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 200,
      ...getColumnFilterProps('joinDate', records),
    },
    {
      title: '직업',
      dataIndex: 'job',
      key: 'job',
      ...getColumnFilterProps('job', records),
    },
    {
      title: '이메일 수신 동의',
      dataIndex: 'emailConsent',
      key: 'emailConsent',
      render: (value: boolean) => <Checkbox checked={value} />,
      width: 150,
      ...getColumnFilterProps('emailConsent', records),
    },
    {
      key: 'action',
      render: (_: any, record: Record) => <UpdateDeleteDropdown record={record} />,
      width: 48,
    },
  ];

  return (
    <StyledTable pagination={false} dataSource={records} columns={columns} rowKey="id" rowSelection={rowSelection} />
  );
}
