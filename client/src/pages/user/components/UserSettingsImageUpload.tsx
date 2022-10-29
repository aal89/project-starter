import { UserOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Space, Avatar, Upload, Button, message, Typography, Popconfirm,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import {
  MeDocument,
  useEditMeMutation,
  useImageUploadLazyQuery,
  UserModel,
} from '../../../graphql/generated/graphql';
import { getImageUrl } from '../../../user';
import { Spinner } from '../../components/Spinner';

const { Title } = Typography;

type UserSettingsImageUploadProps = {
  user: UserModel;
};

export const UserSettingsImageUpload: React.FC<UserSettingsImageUploadProps> = ({ user }) => {
  const [uploading, setUploading] = useState(false);
  const [contentType, setContentType] = useState('');
  const [imageUploadQuery, { loading: uploadLinkLoading }] = useImageUploadLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [editMeMutation] = useEditMeMutation();

  const beforeUpload = async (file: RcFile) => {
    setContentType(file.type);
    return true;
  };

  const deletePicture = async () => {
    try {
      setUploading(true);

      await editMeMutation({
        variables: {
          name: user.name,
          image: null,
        },
        refetchQueries: [MeDocument],
      });

      setUploading(false);
      message.success('Removed profile picture!');
    } catch {
      setUploading(false);
      message.error('Failed to delete profile picture, try again');
    }
  };

  const uploadPicture = async (data: Blob | RcFile) => {
    try {
      setUploading(true);

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
        message.error("Can't create upload, try again");
        return;
      }

      await fetch(uploadParameters.getImageUploadUrl.url, {
        method: 'PUT',
        body: data,
        headers: {
          'Cache-Control': 'public, max-age=15552000',
        },
      });

      await editMeMutation({
        variables: {
          name: user.name,
          image: uploadParameters.getImageUploadUrl.filename,
        },
        refetchQueries: [MeDocument],
      });

      setUploading(false);
      message.success('Changed profile picture!');
    } catch {
      setUploading(false);
      message.error('Failed to change profile picture, try again');
    }
  };

  return (
    <Space direction="vertical" align="center">
      <Title level={5}>Profile picture</Title>
      <Spinner enabled={uploading}>
        <Avatar src={getImageUrl(user)} shape="circle" size={128} icon={<UserOutlined />} />
      </Spinner>
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
      <Popconfirm
        title="Are you sure you wish to delete your profile picture?"
        okText="Yes"
        cancelText="No"
        placement="right"
        onConfirm={deletePicture}
      >
        <Button type="text" shape="circle" icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </Space>
  );
};
