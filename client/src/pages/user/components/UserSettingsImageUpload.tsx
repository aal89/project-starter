import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Space, Avatar, Upload, Button, message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React from 'react';

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file: RcFile) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 20;
//   if (!isLt2M) {
//     message.error('Image must smaller than 20MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };

export const UserSettingsImageUpload: React.FC = () => {
  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Space direction="vertical" align="center">
      <Avatar
        src="https://joeschmoe.io/api/v1/random"
        shape="circle"
        size={128}
        icon={<UserOutlined />}
      />
      <ImgCrop rotate modalOk="Upload" modalTitle="Edit upload" modalCancel="Cancel" shape="round">
        <Upload name="file" showUploadList={false} onChange={onChange}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </ImgCrop>
    </Space>
  );
};
