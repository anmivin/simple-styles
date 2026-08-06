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

export enum MainDecades {
  '21th_century',
  '20th_century',
  '19th_century',
  '18th_century',
  'earlier',
  'unknown',
}

export enum SubDecades {
  '1700s',
  '1720s',
  '1730s',
  '1740s',
  '1750s',
  '1760s',
  '1790s',
  '1800s',
  '1810s',
  '1820s',
  '1830s',
  '1840s',
  '1850s',
  '1860s',
  '1870s',
  '1880s',
  '1890s',
  '1900s',
  '1910s',
  '1920s',
  '1930s',
  '1940s',
  '1950s',
  '1960s',
  '1970s',
  '1980s',
  '1990s',
  '2000s',
  '2010s',
  '2020s',
  'bc',
  '1st_century',
  '4th_century',
  '5th_century',
  '7th_century',
  '8th_century',
  '6th_century',
  '9th_century',
  '10th_century',
  '11th_century',
  '12th_century',
  '13th_century',
  '14th_century',
  '15th_century',
  '16th_century',
  '17th_century',
}
