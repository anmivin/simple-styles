export enum CategoryVariants {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  OVERALL = "OVERALL",
  SHOES = "SHOES",
  ACCESSORY = "ACCESSORY",
  OUTWEAR = "OUTWEAR",
  JEWELRY = "JEWELRY",
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
  comment?: string;
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
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}
