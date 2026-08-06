import { Collapse, Flex, Input, Modal, type CollapseProps } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';

import useUpcycling from '@shared/stores/upcucling.store';
import { useMemo, useState } from 'react';

export interface UpcyclingModalProps {}

const UpcyclingModal = ({}: UpcyclingModalProps) => {
  const { isModalOpened, setIsModalOpened } = useUpcycling((state) => state);
  const [steps, setSteps] = useState<NonNullable<{ key: string; label: string }[]>>([{ key: '1', label: `Шаг №1` }]);

  const genExtra = () => (
    <PlusCircleOutlined
      onClick={(event) => {
        event.stopPropagation();
        setSteps((prev) => [...prev, { key: `${prev.length + 1}`, label: `Шаг №${prev.length + 1}` }]);
      }}
    />
  );

  const items: CollapseProps['items'] = useMemo(
    () =>
      steps.map((step) => ({
        key: step.key,
        label: <Input defaultValue={step.label} />,
        children: <div>dfdf</div>,
        extra: genExtra(),
      })),
    [steps],
  );

  return (
    <Modal title={''} open={isModalOpened} onCancel={() => setIsModalOpened(false)} closable={false} width={800}>
      <Flex gap={4} style={{ width: 800 }}>
        <Flex vertical gap={2}>
          <Collapse items={items} />
        </Flex>
        <Flex vertical gap={2}>
          <Collapse items={items} />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default UpcyclingModal;
