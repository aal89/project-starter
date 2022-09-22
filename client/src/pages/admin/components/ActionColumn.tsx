import {
  EditOutlined, UnlockOutlined, StopOutlined, DeleteOutlined,
} from '@ant-design/icons';
import { Permission, removePermission } from '@project-starter/shared/build';
import {
  Space, Tooltip, Button, Popconfirm, message,
} from 'antd';
import React, { useState } from 'react';
import {
  useDeleteAccountMutation,
  useEditUserMutation,
  UserModel,
  useResetPasswordMutation,
} from '../../../graphql/generated/graphql';
import { EditUserModal } from './EditUserModal';

type ActionColumnProps = {
  user: UserModel;
  dataChanged?: () => void;
};

export const ActionColumn: React.FC<ActionColumnProps> = ({ user, dataChanged }) => {
  const [editUserMutation, { loading: resetLoading }] = useEditUserMutation();
  const [resetPasswordMutation, { loading: passwordLoading }] = useResetPasswordMutation();
  const [deleteAccountMutation, { loading: deleteLoading }] = useDeleteAccountMutation();
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);

  const modalOnClose = (changes: boolean) => {
    setEditUserModalVisible(false);
    if (changes && dataChanged) {
      dataChanged();
    }
  };

  const restrictAccess = async () => {
    const permissions = removePermission(user.encodedPermissions, Permission.LOGIN);
    await editUserMutation({
      variables: {
        input: {
          name: user.name,
          oldUsername: user.username,
          username: user.username,
          email: user.email,
          permissions,
        },
      },
    });
    if (dataChanged) {
      dataChanged();
    }
  };

  const resetPassword = async () => {
    try {
      const result = await resetPasswordMutation({
        variables: {
          id: user.id,
        },
      });
      message.success(`Password succesfully reset to: ${result.data?.resetPassword}`);
    } catch {
      message.error('Resetting password failed, try again later.');
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteAccountMutation({
        variables: {
          id: user.id,
        },
      });
      message.success('Account succesfully deleted');

      if (dataChanged) {
        dataChanged();
      }
    } catch (err) {
      message.error((err as Error).message);
    }
  };

  return (
    <Space>
      {editUserModalVisible && <EditUserModal user={user} onClose={modalOnClose} />}
      <Tooltip title="Edit user">
        <Button
          type="dashed"
          shape="circle"
          icon={<EditOutlined />}
          size="middle"
          onClick={() => setEditUserModalVisible(true)}
        />
      </Tooltip>
      <Tooltip title="Reset password">
        <Popconfirm
          title="Are you sure you wish to reset the password?"
          okText="Yes"
          cancelText="No"
          placement="left"
          onConfirm={resetPassword}
        >
          <Button
            type="dashed"
            shape="circle"
            icon={<UnlockOutlined />}
            size="middle"
            loading={passwordLoading}
          />
        </Popconfirm>
      </Tooltip>
      <Tooltip title="Restrict access">
        <Button
          type="dashed"
          loading={resetLoading}
          shape="circle"
          icon={<StopOutlined />}
          size="middle"
          onClick={restrictAccess}
        />
      </Tooltip>
      <Tooltip title="Delete account">
        <Popconfirm
          title="Are you sure you wish to delete this account?"
          okText="Yes"
          cancelText="No"
          placement="left"
          onConfirm={deleteAccount}
        >
          <Button type="text" shape="circle" icon={<DeleteOutlined />} size="small" loading={deleteLoading} danger />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};
