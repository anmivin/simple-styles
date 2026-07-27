import { styled } from '@mui/material/styles';

import { ViewType } from 'shared/types/typePlatform';
import Box from 'shared/ui/Box';

export const FloatObjetButtons = styled(Box)`
  position: fixed;
  bottom: 32px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const StyledIonHeader = styled(Box)<{ viewType: ViewType }>`
  background: ${({ theme }) => theme.color.commonBackground2};
  padding-bottom: ${({ theme, viewType }) => (viewType === ViewType.Phone ? theme.spacing(3) : theme.spacing(4))};
`;
