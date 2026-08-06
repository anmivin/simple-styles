import type { ItemProps } from '@shared/types';
import { create } from 'zustand';
import { mockitems } from './mocks';

interface UpcyclingStoreProps {
  items: ItemProps[];

  currentItem: ItemProps | null;
  setCurrentItem: (props: ItemProps | null) => void;

  isModalOpened: boolean;
  setIsModalOpened: (props: boolean) => void;
}

const useUpcycling = create<UpcyclingStoreProps>((set) => ({
  items: Object.values(mockitems).flatMap((value) => value.filter((item) => item.toUpcycle)),

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
