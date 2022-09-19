import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Space, Avatar, Upload, Button, message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { useEditMeMutation, useImageUploadLazyQuery, User } from '../../../graphql/generated/graphql';
import { getImageUrl } from '../../../user';

type UserSettingsImageUploadProps = {
  user: User;
};

export const UserSettingsImageUpload: React.FC<UserSettingsImageUploadProps> = ({ user }) => {
  const [contentType, setContentType] = useState('');
  const [imageUploadQuery, { loading: uploadLinkLoading }] = useImageUploadLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [editMeMutation] = useEditMeMutation();

  const beforeUpload = async (file: RcFile) => {
    setContentType(file.type);
    return true;
  };

  const uploadPicture = async (data: Blob | RcFile) => {
    try {
      if (!user || !contentType) {
        message.error('Please refresh the page');
        return;
      }

      const { data: uploadParameters } = await imageUploadQuery({
        variables: {
          contentType,
        },
      });

      if (!uploadParameters) {
        message.error('Can\'t create upload, try again');
        return;
      }

      await fetch(uploadParameters.getImageUploadUrl.url, {
        method: 'PUT',
        body: data,
      });

      await editMeMutation({
        variables: {
          name: user.name,
          image: uploadParameters.getImageUploadUrl.filename,
        },
      });
      message.success('Changed profile picture!');
    } catch {
      message.error('Failed to change profile picture, try again');
    }
  };

  return (
    <Space direction="vertical" align="center">
      <Avatar
        src={getImageUrl(user)}
        shape="circle"
        size={128}
        icon={<UserOutlined />}
      />
      <ImgCrop rotate modalOk="Upload" modalTitle="Edit upload" modalCancel="Cancel" shape="round">
        <Upload
          name="file"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={(options) => {
            if (typeof options.file === 'string') {
              return;
            }
            uploadPicture(options.file);
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
