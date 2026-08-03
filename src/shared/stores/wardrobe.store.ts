import { CategoryVariants } from '@shared/types';
import type { ItemProps } from '@shared/types';
import { create } from 'zustand';
import { mockitems } from './mocks';

interface WardrobeStoreProps {
  items: ItemProps[];
  currentType: CategoryVariants;
  setCurrentType: (props: CategoryVariants) => void;
}

const useWardrobe = create<WardrobeStoreProps>((set) => ({
  items: [],
  currentType: CategoryVariants.TOP,
  setCurrentType: (props) => {
    set({ items: mockitems[props] });
    set({ currentType: props });
  },
}));

export default useWardrobe;
