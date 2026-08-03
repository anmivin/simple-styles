export enum CategoryVariants {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  OVERALL = 'OVERALL',
  SHOES = 'SHOES',
  ACCESSORY = 'ACCESSORY',
  OUTWEAR = 'OUTWEAR',
  JEWELRY = 'JEWELRY',
}

export interface CategoryProps {
  id: string;
  name: CategoryVariants;
}

export interface SubCategoryProps {
  id: string;
  name: string;
  categoryId: string;
}

export interface ItemProps {
  id: string;
  category: CategoryProps;
  subcategory: SubCategoryProps;
  url: string;
  name?: string;
  comment?: string;
  toUpcycle?: boolean;
  notOwned?: boolean;
}

export interface LookItemProps {
  tags: string[];
  subcategory: SubCategoryProps;
}
export interface LookProps {
  items: [];
  tags: string[];
}

export enum ModalVariants {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export interface AestheticProps {
  url: string;
  name: string;
  id: string;
  imageUrl: string;
  description: string;
  categories: string[];
  isVisible: boolean;
  metadata: {
    origins?: {
      otherNames?: string[];
      decade?: string[];
      location?: string[];
      creator?: string[];
    };

    visualThemes?: {
      motifs?: string[];
      colours?: string[];
      values?: string[];
    };
    connections?: {
      related?: string[];
      overlaped?: string[];
      subgenres?: string[];
    };
    timeline?: {
      preceded?: string[];
      succeeded?: string[];
    };
    mediaCulture?: {
      media?: string[];
      brands?: string[];
      platform?: string[];
      figures?: string[];
    };
  };
}
