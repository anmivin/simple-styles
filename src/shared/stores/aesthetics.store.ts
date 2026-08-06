import type { AestheticProps, SubDecades, Decades } from '@shared/types';
import { create } from 'zustand';
import { aesthetics } from '@shared/constants/aesthetics';

interface FiltersProps {
  decades: (SubDecades | Decades)[];
}
interface AestheticsStoreProps {
  items: AestheticProps[];
  filters: FiltersProps;
  setFilters: (props: Partial<FiltersProps>) => void;

  currentAesthetic: AestheticProps | null;
  setCurrentAesthetic: (props: AestheticProps | null) => void;
}

const useAesthetics = create<AestheticsStoreProps>((set) => ({
  items: aesthetics,
  filters: { decades: [] },
  setFilters: (props) => {
    set((state) => ({ filters: { ...state.filters, ...props } }));
    //set({ items: mockitems[props] });
  },

  currentAesthetic: null,
  setCurrentAesthetic: (props) => {
    set({ currentAesthetic: props });
  },
}));

export default useAesthetics;
