import type { ReactElement } from 'react';
import Aesthetics from '@pages/Aesthetics';
import Beauty from '@pages/Beauty';
import Looks from '@pages/Looks';
import Upcycling from '@pages/Upcycling';
import Wardrobe from '@pages/Wardrobe';
import Profile from '@pages/Profile';
import type { MenuProps } from 'antd';
import { CategoriesView } from './labels';
import { decades, subDecades } from './decades';

export enum Paths {
  aesthetics = '/aesthetics',
  beauty = '/beauty',
  looks = '/looks',
  profile = '/profile',
  upcycling = '/upcycling',
  wardrobe = '/wardrobe',
}

export interface RoutesProps {
  key: string;
  link: Paths;
  Component: () => ReactElement;
  name: string;
}

export const routes: RoutesProps[] = [
  {
    key: 'wardrobe',
    link: Paths.wardrobe,
    Component: Wardrobe,
    name: 'Гардероб',
  },
  {
    key: 'looks',
    link: Paths.looks,
    Component: Looks,
    name: 'Луки',
  },
  {
    key: 'beauty',
    link: Paths.beauty,
    Component: Beauty,
    name: 'Бьюти',
  },

  {
    key: 'upcycling',
    link: Paths.upcycling,
    Component: Upcycling,
    name: 'Апсайклинг',
  },

  {
    key: 'aesthetics',
    link: Paths.aesthetics,
    Component: Aesthetics,
    name: 'Эстетики',
  },

  {
    key: 'profile',
    link: Paths.profile,
    Component: Profile,
    name: 'Профиль',
  },
];

export const SubMenu: Record<Paths, MenuProps['items']> = {
  [Paths.aesthetics]: [
    { key: 'all', label: 'Все' },
    ...Object.entries(decades).map(([key, val]) => {
      return {
        key,
        label: val.label,
        children: val.children
          ? [
              { key, label: val.label },
              ...val.children?.map((child) => {
                return {
                  key: child.value,
                  label: child.label,
                };
              }),
            ]
          : undefined,
      };
    }),
  ],
  [Paths.beauty]: [],
  [Paths.looks]: [],
  [Paths.profile]: [],
  [Paths.upcycling]: [],
  [Paths.wardrobe]: Object.entries(CategoriesView).map(([key, val]) => {
    return {
      key,
      label: val.label,
    };
  }),
};
