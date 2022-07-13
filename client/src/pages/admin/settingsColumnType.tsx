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

type ColumnsProps = {
  editUser?: (user: User) => void;
  resetPassword?: (user: User) => void;
  restrictAccess?: (user: User) => void;
  deleteAccount?: (user: User) => void;
};

export const columns: (props: ColumnsProps) => ColumnsType<User & { key: string }> = ({
  editUser,
  resetPassword,
  restrictAccess,
  deleteAccount,
}) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 200,
    render: (text: string) => (
      <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
        {text}
      </Text>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (text: string) => (
      <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
        {text}
      </Text>
    ),
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (text: any) => text ?? '-',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text: any) => text,
  },
  {
    title: 'Permissions',
    dataIndex: 'permissions',
    key: 'permissions',
    render: (text: string) => decode(text).map((e) => <Tag key={e}>{e}</Tag>),
  },
  {
    title: 'Action',
    key: 'action',
    width: 50,
    render: (_: any, record: User) => (
      <Space>
        <Tooltip title="Edit user">
          <Button
            type="dashed"
            shape="circle"
            icon={<EditOutlined />}
            size="small"
            onClick={() => editUser && editUser(record)}
          />
        </Tooltip>
        <Tooltip title="Reset password">
          <Button
            type="dashed"
            shape="circle"
            icon={<UnlockOutlined />}
            size="small"
            onClick={() => resetPassword && resetPassword(record)}
          />
        </Tooltip>
        <Tooltip title="Restrict access">
          <Button
            type="dashed"
            shape="circle"
            icon={<StopOutlined />}
            size="small"
            onClick={() => restrictAccess && restrictAccess(record)}
          />
        </Tooltip>
        <Tooltip title="Delete account">
          <Button
            type="text"
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => deleteAccount && deleteAccount(record)}
          />
        </Tooltip>
      </Space>
    ),
  },
];
