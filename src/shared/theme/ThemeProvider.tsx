import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';
import { token } from './tokens';
import './global.css';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider theme={{ token }}>{children}</ConfigProvider>;
};

export default ThemeProvider;
