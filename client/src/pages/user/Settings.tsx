import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Col, Form, Input, message, Row, Space, Upload, Typography,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { withProtectedRoute } from '../../enhancers/withProtectedRoute';
import { useAuth } from '../../hooks/auth';
import { SetLayoutContext } from '../components/Layout';

const { Text } = Typography;

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

const Settings: React.FC = () => {
  const { setTitle, setTitleContent } = useOutletContext<SetLayoutContext>();
  const { user } = useAuth();

  useEffect(() => {
    setTitle(`Hello ${user?.name ?? ''}!`);
    setTitleContent(
      <>
        <Text strong>
          Your email:
          {user?.email}
        </Text>
        lastOnlineAt createdAt
      </>,
    );
  }, []);

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
    <Row gutter={[24, 0]}>
      <Col flex="none">
        <Space direction="vertical" align="center">
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            shape="circle"
            size={128}
            icon={<UserOutlined />}
          />
          <ImgCrop
            rotate
            modalOk="Upload"
            modalTitle="Edit upload"
            modalCancel="Cancel"
            shape="round"
          >
            <Upload name="file" showUploadList={false} onChange={onChange}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </ImgCrop>
        </Space>
      </Col>
      <Col flex="auto">
        <Form
          wrapperCol={{ span: 8 }}
          initialValues={{
            name: user?.name,
            lastName: user?.lastName,
            username: user?.username,
            password: '',
          }}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Last name" name="lastName">
            <Input />
          </Form.Item>

          <Form.Item label="Username" name="username">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default withProtectedRoute(withCleanLayoutVars(Settings));
