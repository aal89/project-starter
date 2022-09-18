import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Space, Avatar, Upload, Button, message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { ImageUploadQuery, useImageUploadLazyQuery } from '../../../graphql/generated/graphql';

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

export const UserSettingsImageUpload: React.FC = () => {
  const [uploadParameters, setUploadParameters] = useState<ImageUploadQuery | null>();
  const [imageUploadQuery, { loading: uploadLinkLoading }] = useImageUploadLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = async (file: RcFile) => {
    const contentType = file.type;
    try {
      const { data: imageUploadResult } = await imageUploadQuery({
        variables: {
          contentType,
        },
      });

      setUploadParameters(imageUploadResult);

      return true;
    } catch {
      return false;
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
        <Upload
          name="file"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={onChange}
          customRequest={async (options) => {
            if (!uploadParameters) {
              return;
            }
            await fetch(uploadParameters.getImageUploadUrl.url, {
              method: 'PUT',
              body: options.file,
            });
          }}
        >
          <Button icon={<UploadOutlined />} disabled={uploadLinkLoading}>
            Change
          </Button>
        </Upload>
      </ImgCrop>
    </Space>
  );
};
