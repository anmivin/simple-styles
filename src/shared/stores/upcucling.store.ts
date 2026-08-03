import { CategoryVariants } from '@shared/types';
import type { ItemProps } from '@shared/types';
import { create } from 'zustand';
import { mockitems } from './mocks';

interface UpcyclingStoreProps {
  items: ItemProps[];
  currentType: CategoryVariants;
  setCurrentType: (props: CategoryVariants) => void;

  currentItem: ItemProps | null;
  setCurrentItem: (props: ItemProps | null) => void;

  isModalOpened: boolean;
  setIsModalOpened: (props: boolean) => void;
}

const useUpcycling = create<UpcyclingStoreProps>((set) => ({
  items: mockitems[CategoryVariants.TOP],
  currentType: CategoryVariants.TOP,
  setCurrentType: (props) => {
    console.log('?', props);
    console.log(mockitems[props]);
    set({ items: mockitems[props] });
    set({ currentType: props });
  },

  currentItem: null,
  setCurrentItem: (props) => {
    set({ currentItem: props });
  },

  isModalOpened: false,
  setIsModalOpened: (props) => {
    set({ isModalOpened: props });
  },
}));

export default useUpcycling;
