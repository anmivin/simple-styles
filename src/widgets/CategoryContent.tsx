import { Typography, Empty, Flex } from "antd";
import type { ItemProps } from "../shared/types";
import ItemCard from "../entities/ItemCard";

export interface CategoryContentProps {
  label: string;
  items: ItemProps[];
}

const CategoryContent = ({ label, items }: CategoryContentProps) => {
  return (
    <Flex vertical>
      <Typography.Text>{label}</Typography.Text>
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
