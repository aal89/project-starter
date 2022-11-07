import {
  EditOutlined, UnlockOutlined, StopOutlined, DeleteOutlined,
} from '@ant-design/icons';
import { Permission, removePermission } from '@project-starter/shared/build';
import {
  Space, Tooltip, Button, Popconfirm, message,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();

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
      message.success(
        intl.formatMessage(
          { id: 'Admin.PasswordReset.Success' },
          { password: result.data?.resetPassword },
        ),
      );
    } catch {
      message.error(intl.formatMessage({ id: 'Admin.PasswordReset.Error' }));
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteAccountMutation({
        variables: {
          id: user.id,
        },
      });
      message.success(intl.formatMessage({ id: 'Admin.DeleteAccount.Success' }));

      if (dataChanged) {
        dataChanged();
      }
    } catch (err) {
      message.error(intl.formatMessage({ id: 'Admin.DeleteAccount.Error' }));
    }
  };

  return (
    <Space>
      {editUserModalVisible && <EditUserModal user={user} onClose={modalOnClose} />}
      <Tooltip title={intl.formatMessage({ id: 'Admin.EditAccount.Tooltip.Title' })}>
        <Button
          type="dashed"
          shape="circle"
          icon={<EditOutlined />}
          size="middle"
          onClick={() => setEditUserModalVisible(true)}
        />
      </Tooltip>
      <Tooltip title={intl.formatMessage({ id: 'Admin.PasswordReset.Tooltip.Title' })}>
        <Popconfirm
          title={intl.formatMessage({ id: 'Admin.PasswordReset.Pop.Title' })}
          okText={intl.formatMessage({ id: 'Admin.PasswordReset.Pop.Ok' })}
          cancelText={intl.formatMessage({ id: 'Admin.PasswordReset.Pop.Cancel' })}
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
      <Tooltip title={intl.formatMessage({ id: 'Admin.EditAccount.RestrictAccess.Tooltip.Title' })}>
        <Button
          type="dashed"
          loading={resetLoading}
          shape="circle"
          icon={<StopOutlined />}
          size="middle"
          onClick={restrictAccess}
        />
      </Tooltip>
      <Tooltip title={intl.formatMessage({ id: 'Admin.DeleteAccount.Tooltip.Title' })}>
        <Popconfirm
          title={intl.formatMessage({ id: 'Admin.DeleteAccount.Pop.Title' })}
          okText={intl.formatMessage({ id: 'Admin.DeleteAccount.Pop.Ok' })}
          cancelText={intl.formatMessage({ id: 'Admin.DeleteAccount.Pop.Cancel' })}
          placement="left"
          onConfirm={deleteAccount}
        >
          <Button
            type="text"
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            loading={deleteLoading}
            danger
          />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};
