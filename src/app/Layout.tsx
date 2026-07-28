import { useCallback, useMemo, type ReactNode } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Paths, routes } from '@shared/constants/routes';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout as AntLayout, Menu } from 'antd';
import { CategoriesView } from '@shared/constants/labels';
import useWardrobe from '@shared/stores/wardrobe.store';
import type { CategoryVariants } from '@shared/types';

const { Header, Content, Sider } = AntLayout;

const Layout = ({ children }: { children: ReactNode }) => {
  const setItem = useWardrobe((state) => state.setCurrentType);
  const { pathname } = useLocation();

  const items1: MenuProps['items'] = routes.slice(0, routes.length - 1).map((route) => ({
    key: route.key,
    label: (
      <Link to={route.link} key={route.link}>
        {route.name}
      </Link>
    ),
  }));

  const items2: MenuProps['items'] = useMemo(() => {
    switch (pathname) {
      case Paths.wardrobe:
        return Object.entries(CategoriesView).map(([key, val]) => {
          return {
            key,
            /*  icon: React.createElement(icon), */
            label: val.label,
          };
        });
      case Paths.aesthetics:
        return [
          {
            key: '1',
            label: '',
          },
        ];
    }
  }, [pathname]);

  const subMenuOnClick = useCallback(
    (key: string) => {
      switch (pathname) {
        case Paths.wardrobe:
          return setItem(key as CategoryVariants);
        case Paths.aesthetics:
          return () => {};
      }
    },
    [pathname],
  );

  return (
    <AntLayout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Link to={Paths.profile} key={'profile'}>
          <UserOutlined />
        </Link>
      </Header>
      <AntLayout>
        <Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderInlineEnd: 0 }}
            items={items2}
            onClick={(e) => subMenuOnClick(e.key)}
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
