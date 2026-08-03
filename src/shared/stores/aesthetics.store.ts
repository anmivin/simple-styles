import type { AestheticProps } from '@shared/types';
import { create } from 'zustand';
import { aesthetics } from '@shared/constants/aesthetics';

interface FiltersProps {}
interface AestheticsStoreProps {
  items: AestheticProps[];
  filters: FiltersProps;
  setFilters: (props: FiltersProps) => void;

  currentAesthetic: AestheticProps | null;
  setCurrentAesthetic: (props: AestheticProps | null) => void;
}

const useAesthetics = create<AestheticsStoreProps>((set) => ({
  items: aesthetics,
  filters: {},
  setFilters: (props) => {
    set({ filters: props });
    //set({ items: mockitems[props] });
  },

  currentAesthetic: null,
  setCurrentAesthetic: (props) => {
    set({ currentAesthetic: props });
  },
}));

export default useAesthetics;
