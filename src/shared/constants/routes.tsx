import type { ReactElement } from 'react';
import Aesthetics from '@pages/Aesthetics';
import Beauty from '@pages/Beauty';
import Looks from '@pages/Looks';
import Upcycling from '@pages/Upcycling';
import Wardrobe from '@pages/Wardrobe';
import Profile from '@pages/Profile';

export const Paths = {
  aesthetics: '/aesthetics',
  beauty: '/beauty',
  looks: '/looks',
  profile: '/profile',
  upcycling: '/upcycling',
  wardrobe: '/wardrobe',
} as const;

export interface RoutesProps {
  key: string;
  link: string;
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
