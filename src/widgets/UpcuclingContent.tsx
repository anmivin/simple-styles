import { Button, Empty, Flex, Typography } from 'antd';

import useUpcycling from '@shared/stores/upcucling.store';
import { PlusOutlined } from '@ant-design/icons';
import ItemCard from '@entities/ItemCard/ItemCard';

const UpcuclingContent = () => {
  const { items, setIsModalOpened } = useUpcycling((state) => state);
  return (
    <Flex vertical>
      <Flex align="center" justify="space-between">
        <Typography.Title>Переделки</Typography.Title>
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

export default UpcuclingContent;
