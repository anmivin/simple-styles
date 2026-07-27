import {
  Checkbox,
  Flex,
  Input,
  Modal,
  Select,
  Typography,
  message,
  Upload,
  type CheckboxProps,
  type InputProps,
  type ModalProps,
  type SelectProps,
  type GetProp,
  type UploadProps,
} from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { ModalVariants } from "../shared/types";
import { CategoriesView } from "../shared/constants/labels";
import { useState } from "react";

export interface ItemModalProps extends ModalProps {
  mode: ModalVariants;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ItemModal = ({ mode, ...props }: ItemModalProps) => {
  const onChangeCheckbox: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChangeSelect: SelectProps["onChange"] = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChangeInput: InputProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.value}`);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      messageApi.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  return (
    <Modal
      title={`${mode === ModalVariants.CREATE ? "Создание" : "Редактирования"} `}
      {...props}
    >
      {contextHolder}

      <Flex vertical gap={2}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              draggable={false}
              src={imageUrl}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Typography.Text>Название</Typography.Text>
        <Input onChange={onChangeInput} />
        <Typography.Text>Категория</Typography.Text>
        <Select
          onChange={onChangeSelect}
          options={Object.entries(CategoriesView).map(([key, val]) => ({
            value: key,
            label: val.label,
          }))}
        />
        <Checkbox onChange={onChangeCheckbox}>Не приобретено</Checkbox>
      </Flex>
    </Modal>
  );
};

export default ItemModal;
