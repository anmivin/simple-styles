import { InfoCircleVariant } from './InfoCircle.types';
import type { ReactNode } from 'react';
import { InfoCircleOutlined, ReloadOutlined, LockOutlined } from '@ant-design/icons';

export const InfoCircleView: Record<InfoCircleVariant, { title: string; color: string; icon: ReactNode }> = {
  [InfoCircleVariant.Info]: { title: 'Комментарий', icon: <InfoCircleOutlined />, color: 'blue' },
  [InfoCircleVariant.NotOwned]: { title: 'Не преобретено', icon: <LockOutlined />, color: 'purple' },
  [InfoCircleVariant.ToUpcycle]: { title: 'Требеует переделки', icon: <ReloadOutlined />, color: 'magenta' },
};
