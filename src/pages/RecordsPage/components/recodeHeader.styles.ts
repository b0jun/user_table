import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #ffffff;
`;

export const Title = styled(Typography.Title)`
  && {
    margin: 0;
  }
`;
