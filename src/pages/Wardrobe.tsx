import { Button, Flex, FloatButton, Input, Tabs, Upload } from 'antd';

import type { TabsProps } from 'antd';
import { CategoriesView } from '../shared/constants/labels';
import CategoryContent from '../widgets/CategoryContent';
import ItemModal from '../features/ItemModal';
import { useState } from 'react';
import { CategoryVariants, ModalVariants, type ItemProps } from '../shared/types';
import useWardrobe from '@shared/stores/wardrobe.store';
import { PlusCircleOutlined } from '@ant-design/icons';

const mockitems: Record<CategoryVariants, ItemProps[]> = {
  [CategoryVariants.TOP]: [
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
  ],
  [CategoryVariants.BOTTOM]: [],
  [CategoryVariants.OVERALL]: [
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
      comment: 'kzkkz kddslkd sdjie a;a',
    },
  ],
  [CategoryVariants.SHOES]: [
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
  ],
  [CategoryVariants.ACCESSORY]: [
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
  ],
  [CategoryVariants.OUTWEAR]: [
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
  ],
  [CategoryVariants.JEWELRY]: [
    {
      id: '1',
      category: {
        id: CategoryVariants.TOP,
        name: CategoryVariants.TOP,
      },
      subcategory: {
        id: '1',
        name: 'name',
        categoryId: '1',
      },
      url: 'https://cleacom.ru/wp-content/uploads/2025/04/kris44.jpg',
    },
  ],
};
const MainPage = () => {
  const selectedType = useWardrobe((state) => state.currentType);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FloatButton icon={<PlusCircleOutlined />} onClick={() => setIsModalOpen(true)} />

      <CategoryContent label={CategoriesView[selectedType].label} items={mockitems[selectedType]} />
      <ItemModal mode={ModalVariants.CREATE} open={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </>
  );
};

export default MainPage;
