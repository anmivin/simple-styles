import { Flex } from 'antd';
import styled from 'styled-components';

export const StyledInfoCircle = styled(Flex)<{ bgcolor?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ bgcolor }) => `var(--ant-${bgcolor})`};
  justify-content: center;
  cursor: pointer;
`;
