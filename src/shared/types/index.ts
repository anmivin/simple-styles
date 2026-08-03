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
  description: string;
  metadata: {
    Origins: {
      'Other names': string;
      'Decade of origin': string;
      'Location of origin': string;
      'Creator(s)'?: undefined;
      'Coined by'?: undefined;
    };
    'Visuals & Themes': {
      'Key motifs': string;
      'Key colours': string;
      'Key values': string;
    };
    Connections: {
      Relatedaesthetics: string[];
      Overlapswith?: undefined;
      Subgenres?: undefined;
    };
  };
  categories: string[];
  isVisible: boolean;
  imageUrl?: undefined;
}
