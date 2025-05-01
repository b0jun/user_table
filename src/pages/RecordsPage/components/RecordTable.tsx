import { Checkbox } from 'antd';
import { FilterDropdownMenu, FilterMenuItem, FilterMenuItemContent, StyledTable } from './recordTable.styles';
import { useRecordActions, useRecordState } from '../context/RecordContext';
import { Record, Field } from '../types';
import UpdateDeleteDropdown from './UpdateDeleteDropdown';
import { type ColumnsType, type FilterDropdownProps } from 'antd/es/table/interface';
import { defaultFields } from '../lib/data';

export default function RecordTable() {
  const { records, selectedRowKeys } = useRecordState();
  const { setSelectedRowKeys } = useRecordActions();

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const getColumnFilterProps = (field: Field, records: Record[]) => {
    // * 레코드에서 고유 값 추출
    const uniqueValues = Array.from(
      new Set(records.map((record) => record.fields[field.key]).filter((value) => value !== null)),
    );
    const filterOptions = uniqueValues.map((value) => ({
      label: field.type === 'checkbox' ? (value ? '선택됨' : '선택 안함') : value,
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
        const fieldValue = record.fields[field.key];
        if (fieldValue === null) {
          return false;
        }
        return fieldValue.toString() === value.toString();
      },
    };
  };

  const columns: ColumnsType<Record> = defaultFields.map((field: Field) => ({
    title: field.label,
    dataIndex: ['fields', field.key],
    key: field.key,
    render: (value: string | boolean | null) =>
      field.type === 'checkbox' ? <Checkbox checked={value as boolean} /> : value,
    ...(field.width && { width: field.width }), // * width 없는경우 자동배분
    ...getColumnFilterProps(field, records),
  }));

  columns.push({
    key: 'action',
    render: (_: any, record: Record) => <UpdateDeleteDropdown record={record} />,
    width: 48,
  });

  return (
    <StyledTable pagination={false} dataSource={records} columns={columns} rowKey="id" rowSelection={rowSelection} />
  );
}
