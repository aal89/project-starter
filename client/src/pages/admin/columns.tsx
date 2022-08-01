import { decode } from '@project-starter/shared/build';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { User } from '../../graphql/generated/graphql';
import { ActionColumn } from './components/ActionColumn';
import { IdColumn } from './components/IdColumn';
import { NameColumn } from './components/NameColumn';

type ColumnsProps = {
  dataChanged?: () => void;
};

export const columns: (props: ColumnsProps) => ColumnsType<User & { key: string }> = ({
  dataChanged,
}) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 200,
    render: (text: string) => <IdColumn text={text} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    render: (text: string) => <NameColumn text={text} />,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 300,
    render: (text: any) => text,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text: any) => text,
  },
  {
    title: 'Permissions',
    dataIndex: 'encodedPermissions',
    key: 'permissions',
    width: 500,
    render: (text: string) => decode(text).map((e) => <Tag key={e}>{e}</Tag>),
  },
  {
    title: 'Action',
    key: 'action',
    width: 50,
    render: (_: any, record: User) => <ActionColumn user={record} dataChanged={dataChanged} />,
  },
];
