import { create } from 'zustand';

import { Paths, SubMenu } from '@shared/constants/routes';
import type { MenuProps } from 'antd';
import useWardrobe from './wardrobe.store';
import type { CategoryVariants } from '@shared/types';
import useAesthetics from './aesthetics.store';

interface MenuConfig {
  sideBarItems: MenuProps['items'];
  onSidebarItemClick: (info: Parameters<NonNullable<MenuProps['onClick']>>[0]) => void;
}

interface NavigationStore {
  menuConfig: MenuConfig;
  updateMenuConfig: (path: Paths) => void;
}

const useNavigationStore = create<NavigationStore>((set) => ({
  menuConfig: {
    sideBarItems: [],
    onSidebarItemClick: () => {},
  },
  updateMenuConfig: (path) => {
    const configs: Record<Paths, MenuConfig> = {
      [Paths.aesthetics]: {
        sideBarItems: SubMenu[Paths.aesthetics],
        onSidebarItemClick: (info) => {
          console.log(info);
          useAesthetics.getState().setFilters;
        },
      },

      [Paths.beauty]: {
        sideBarItems: [],
        onSidebarItemClick: (info) => {},
      },
      [Paths.looks]: {
        sideBarItems: [],
        onSidebarItemClick: (info) => {},
      },
      [Paths.profile]: {
        sideBarItems: [],
        onSidebarItemClick: (info) => {},
      },
      [Paths.upcycling]: {
        sideBarItems: [],
        onSidebarItemClick: (info) => {},
      },
      [Paths.wardrobe]: {
        sideBarItems: SubMenu[Paths.wardrobe],
        onSidebarItemClick: (info) => {
          useWardrobe.getState().setCurrentType(info.key as CategoryVariants);
        },
      },
    };
    set({ menuConfig: configs[path] || configs[Paths.wardrobe] });
  },
}));

export default useNavigationStore;
