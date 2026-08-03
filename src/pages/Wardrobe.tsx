import { FloatButton } from 'antd';

import CategoryContent from '@widgets/CategoryContent';
import ItemModal from '@features/ItemModal';
import { useState } from 'react';
import { ModalVariants } from '@shared/types';

import { PlusCircleOutlined } from '@ant-design/icons';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FloatButton icon={<PlusCircleOutlined />} onClick={() => setIsModalOpen(true)} />
      <CategoryContent />
      <ItemModal mode={ModalVariants.CREATE} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MainPage;
