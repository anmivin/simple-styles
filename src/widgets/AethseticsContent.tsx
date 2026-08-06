import { Button, Flex } from 'antd';
import AethseticCard from '@entities/AethseticCard/AethseticCard';
import useAesthetics from '@shared/stores/aesthetics.store';

const AestheticsContent = () => {
  const { items } = useAesthetics((state) => state);
  return (
    <Flex wrap gap={20} style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      {items.map((item) => (
        <AethseticCard aesthetic={item} />
      ))}
    </Flex>
  );
};

export default AestheticsContent;
