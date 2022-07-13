import {
  DeleteOutlined, EditOutlined, StopOutlined, UnlockOutlined,
} from '@ant-design/icons';
import { decode } from '@project-starter/shared/build';
import {
  Tag, Space, Typography, Button, Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { User } from '../../graphql/generated/graphql';

const { Text } = Typography;

export const columns: ColumnsType<User & { key: string }> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 200,
    render: (text) => (
      <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
        {text}
      </Text>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => text,
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (text) => text ?? '-',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text) => text,
  },
  {
    title: 'Permissions',
    dataIndex: 'permissions',
    key: 'permissions',
    render: (text) => decode(text).map((e) => <Tag key={e}>{e}</Tag>),
  },
  {
    title: 'Action',
    key: 'action',
    width: 50,
    render: () => (
      <Space>
        <Tooltip title="Edit user">
          <Button type="dashed" shape="circle" icon={<EditOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Reset password">
          <Button type="dashed" shape="circle" icon={<UnlockOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Restrict access">
          <Button type="dashed" shape="circle" icon={<StopOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Delete account">
          <Button type="text" shape="circle" icon={<DeleteOutlined />} size="small" danger />
        </Tooltip>
      </Space>
    ),
  },
];
