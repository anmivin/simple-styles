import { CategoryVariants } from "../types";

export const CategoriesView: Record<CategoryVariants, { label: string }> = {
  [CategoryVariants.TOP]: { label: "Верх" },
  [CategoryVariants.BOTTOM]: { label: "Низ" },
  [CategoryVariants.OVERALL]: { label: "Всё тело" },
  [CategoryVariants.SHOES]: { label: "Обувь" },
  [CategoryVariants.ACCESSORY]: { label: "Аксессуары" },
  [CategoryVariants.OUTWEAR]: { label: "Верхняя одежда" },
  [CategoryVariants.JEWELRY]: { label: "Украшения" },
};
