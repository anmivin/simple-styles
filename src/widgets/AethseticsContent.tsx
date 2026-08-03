import { aesthetics } from '@shared/constants/aeth';
import { Button, Flex } from 'antd';
import AethseticCard from '@entities/AethseticCard/AethseticCard';
const AestheticsContent = () => {
  return (
    <Flex wrap gap={20}>
      {aesthetics.map((ae) => (
        <AethseticCard {...ae} />
      ))}
    </Flex>
  );
};

export default AestheticsContent;
