import {
  Checkbox,
  Flex,
  Input,
  Drawer,
  Select,
  Typography,
  message,
  Upload,
  type CheckboxProps,
  type InputProps,
  type SelectProps,
  type GetProp,
  type UploadProps,
  type DrawerProps,
  Modal,
} from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { ModalVariants } from '../shared/types';
import { CategoriesView } from '../shared/constants/labels';
import { useState } from 'react';
import useAesthetics from '@shared/stores/aesthetics.store';

export interface AestheticModalProps {}

const AestheticModal = ({}: AestheticModalProps) => {
  const { currentAesthetic, setCurrentAesthetic } = useAesthetics((state) => state);

  return (
    <Modal title={currentAesthetic?.name} open={!!currentAesthetic} onCancel={() => setCurrentAesthetic(null)}>
      <Flex vertical gap={2}></Flex>
    </Modal>
  );
};

export default AestheticModal;
