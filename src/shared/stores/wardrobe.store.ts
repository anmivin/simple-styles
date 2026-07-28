import { CategoryVariants } from '@shared/types';
import type { ItemProps } from '@shared/types';
import { create } from 'zustand';

interface WardrobeStoreProps {
  items: ItemProps[];
  currentType: CategoryVariants;
  setCurrentType: (props: CategoryVariants) => void;
}

const useWardrobe = create<WardrobeStoreProps>((set) => ({
  items: [],
  currentType: CategoryVariants.TOP,
  setCurrentType: (props) => set({ currentType: props }),
}));

export default useWardrobe;
