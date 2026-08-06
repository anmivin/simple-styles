import { useEffect, type ReactNode } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Paths, routes } from '@shared/constants/routes';

import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout as AntLayout, Menu } from 'antd';

import useNavigationStore from '@shared/stores/navigation.store';

const { Header, Content, Sider } = AntLayout;

const Layout = ({ children }: { children: ReactNode }) => {
  const { menuConfig, updateMenuConfig } = useNavigationStore((state) => state);
  const { pathname } = useLocation();

  const items1: MenuProps['items'] = routes.slice(0, routes.length - 1).map((route) => ({
    key: route.key,
    label: (
      <Link to={route.link} key={route.link}>
        {route.name}
      </Link>
    ),
  }));

  useEffect(() => updateMenuConfig(pathname as Paths), [pathname]);

  return (
    <AntLayout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu theme="dark" mode="horizontal" items={items1} style={{ flex: 1, minWidth: 0 }} />
        <Link to={Paths.profile} key={'profile'}>
          <UserOutlined />
        </Link>
      </Header>
      <AntLayout>
        <Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderInlineEnd: 0 }}
            items={menuConfig.sideBarItems}
            onClick={(e) => menuConfig.onSidebarItemClick?.(e)}
          />
        </Sider>
        <AntLayout style={{ padding: '0 24px 24px', height: '100%' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: '2px',
            }}
          >
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
