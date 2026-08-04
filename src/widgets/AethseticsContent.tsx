import { Button, Flex } from 'antd';
import AethseticCard from '@entities/AethseticCard/AethseticCard';
import AestheticModal from '@features/AestheticModal';
import useAesthetics from '@shared/stores/aesthetics.store';

const AestheticsContent = () => {
  const { items } = useAesthetics((state) => state);
  return (
    <Flex wrap gap={20}>
      <Button
        onClick={() => {
          console.log(new Set(items.flatMap((item) => item.metadata?.origins?.decade)));
        }}
      >
        sss
      </Button>
      {items.map((item) => (
        <AethseticCard aesthetic={item} />
      ))}
      <AestheticModal />
    </Flex>
  );
};

export default AestheticsContent;
