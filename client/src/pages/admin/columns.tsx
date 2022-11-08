import { decode } from '@project-starter/shared/build';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { IntlShape } from 'react-intl';
import { UserModel } from '../../graphql/generated/graphql';
import { ActionColumn } from './components/ActionColumn';
import { IdColumn } from './components/IdColumn';
import { NameColumn } from './components/NameColumn';

type ColumnsProps = {
  dataChanged?: () => void;
  intl: IntlShape;
};

export const columns: (props: ColumnsProps) => ColumnsType<UserModel & { key: string }> = ({
  dataChanged,
  intl,
}) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 200,
    render: (text: string) => <IdColumn text={text} />,
    responsive: ['lg'],
  },
  {
    title: intl.formatMessage({ id: 'Admin.UsersTable.Name' }),
    dataIndex: 'name',
    key: 'name',
    width: 300,
    render: (text: string) => <NameColumn text={text} />,
    responsive: ['sm'],
  },
  {
    title: intl.formatMessage({ id: 'Admin.UsersTable.Email' }),
    dataIndex: 'email',
    key: 'email',
    width: 300,
    render: (text: any) => text,
    responsive: ['md'],
  },
  {
    title: intl.formatMessage({ id: 'Admin.UsersTable.Username' }),
    dataIndex: 'username',
    key: 'username',
    render: (text: any) => text,
  },
  {
    title: intl.formatMessage({ id: 'Admin.UsersTable.Permissions' }),
    dataIndex: 'encodedPermissions',
    key: 'permissions',
    width: 500,
    render: (text: string) => decode(text).map((e) => <Tag key={e}>{e}</Tag>),
    responsive: ['lg'],
  },
  {
    title: intl.formatMessage({ id: 'Admin.UsersTable.Actions' }),
    key: 'action',
    width: 50,
    render: (_: any, record: UserModel) => <ActionColumn user={record} dataChanged={dataChanged} />,
  },
];
