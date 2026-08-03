import { Typography, Empty, Flex, Button } from 'antd';
import type { ItemProps } from '../shared/types';
import ItemCard from '@entities/ItemCard/ItemCard';
import useWardrobe from '@shared/stores/wardrobe.store';
import { CategoriesView } from '@shared/constants/labels';
import { PlusOutlined } from '@ant-design/icons';

export interface CategoryContentProps {
  label: string;
  items: ItemProps[];
}

const CategoryContent = () => {
  const { currentType, items, setIsModalOpened } = useWardrobe((state) => state);
  return (
    <Flex vertical>
      <Flex align="center" justify="space-between">
        <Typography.Title>{CategoriesView[currentType].label}</Typography.Title>
        <Button onClick={() => setIsModalOpened(true)} size="large" icon={<PlusOutlined />}>
          Добавить
        </Button>
      </Flex>

      <Flex gap={16} wrap>
        {!items.length && <Empty />}
        {items.map((item) => (
          <ItemCard item={item} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CategoryContent;
