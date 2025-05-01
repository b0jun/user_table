import { Table, TableProps } from 'antd';
import styled from 'styled-components';
import { Record } from '../types';

export const StyledTable = styled(Table)<TableProps<Record>>`
  && {
    .ant-table-container {
      border-top: 1px solid #0000000f;
      border-radius: 0;
    }

    .ant-table-thead .ant-table-cell {
      padding-left: 8px;
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .ant-table-tbody .ant-table-cell {
      padding: 8px;
    }

    .ant-table-filter-column {
      display: flex;
      align-items: center;
    }

    .ant-table-filter-trigger {
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-table-tbody .ant-table-selection-column {
      border-right: 1px solid #0000000f;
    }
  }
`;

export const FilterDropdownMenu = styled.ul`
  list-style: none;
  padding: 8px;
  margin: 0;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0px 9px 28px 8px #0000000d;
  min-width: 150px;
`;

export const FilterMenuItem = styled.li<{ selected?: boolean }>`
  padding: 5px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  background-color: ${(props) => (props.selected ? '#F0F7FF' : 'transparent')};
  &:hover {
    background-color: #0000000a;
  }
`;

export const FilterMenuItemContent = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;
