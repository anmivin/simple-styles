import { Typography, Empty, Flex } from 'antd';
import type { ItemProps } from '../shared/types';
import ItemCard from '@entities/ItemCard/ItemCard';
import useWardrobe from '@shared/stores/wardrobe.store';
import { CategoriesView } from '@shared/constants/labels';

export interface CategoryContentProps {
  label: string;
  items: ItemProps[];
}

const CategoryContent = () => {
  const { currentType, items } = useWardrobe((state) => state);
  return (
    <Flex vertical>
      <Typography.Text>{CategoriesView[currentType].label}</Typography.Text>
      <Flex gap={4} wrap>
        {!items.length && <Empty />}
        {items.map((item) => (
          <ItemCard {...item} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CategoryContent;
