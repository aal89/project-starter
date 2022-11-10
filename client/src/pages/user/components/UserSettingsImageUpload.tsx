import { UserOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Space, Avatar, Upload, Button, message, Typography, Popconfirm,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
  const intl = useIntl();

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
      message.success(intl.formatMessage({ id: 'Settings.User.Picture.Delete.Success' }));
    } catch {
      setUploading(false);
      message.error(intl.formatMessage({ id: 'Settings.User.Picture.Delete.Error' }));
    }
  };

  const uploadPicture = async (data: Blob | RcFile) => {
    try {
      setUploading(true);

      if (!user || !contentType) {
        message.error(intl.formatMessage({ id: 'Settings.User.Picture.Upload.Error.1' }));
        return;
      }

      const { data: uploadParameters } = await imageUploadQuery({
        variables: {
          contentType,
        },
      });

      if (!uploadParameters) {
        message.error(intl.formatMessage({ id: 'Settings.User.Picture.Upload.Error.2' }));
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
      message.success(intl.formatMessage({ id: 'Settings.User.Picture.Upload.Success' }));
    } catch {
      setUploading(false);
      message.error(intl.formatMessage({ id: 'Settings.User.Picture.Upload.Error.3' }));
    }
  };

  return (
    <Space direction="vertical" align="center">
      <Title level={5}>
        <FormattedMessage id="Settings.User.Picture.Title" />
      </Title>
      <Spinner enabled={uploading}>
        <Avatar src={getImageUrl(user.image)} shape="circle" size={128} icon={<UserOutlined />} />
      </Spinner>
      <ImgCrop
        rotate
        modalOk={intl.formatMessage({ id: 'Settings.User.Picture.Crop.Ok' })}
        modalTitle={intl.formatMessage({ id: 'Settings.User.Picture.Crop.Title' })}
        modalCancel={intl.formatMessage({ id: 'Settings.User.Picture.Crop.Cancel' })}
        shape="round"
      >
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
            <FormattedMessage id="Settings.User.Picture.Submit" />
          </Button>
        </Upload>
      </ImgCrop>
      <Popconfirm
        title={intl.formatMessage({ id: 'Settings.User.Picture.Delete.Confirm.Title' })}
        okText={intl.formatMessage({ id: 'Settings.User.Picture.Delete.Confirm.Ok' })}
        cancelText={intl.formatMessage({ id: 'Settings.User.Picture.Delete.Confirm.Cancel' })}
        placement="right"
        onConfirm={deletePicture}
      >
        <Button type="text" shape="circle" icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </Space>
  );
};
