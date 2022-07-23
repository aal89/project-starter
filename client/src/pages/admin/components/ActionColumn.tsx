import {
  EditOutlined, UnlockOutlined, StopOutlined, DeleteOutlined,
} from '@ant-design/icons';
import { Permission, removePermission } from '@project-starter/shared/build';
import { Space, Tooltip, Button } from 'antd';
import React, { useState } from 'react';
import { useEditUserMutation, User } from '../../../graphql/generated/graphql';
import { EditUserModal } from './EditUserModal';

type ActionColumnProps = {
  user: User;
  dataChanged?: () => void;
};

export const ActionColumn: React.FC<ActionColumnProps> = ({ user, dataChanged }) => {
  const [editUserMutation, { loading: resetLoading }] = useEditUserMutation();
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
          permissions,
        },
      },
    });
    if (dataChanged) {
      dataChanged();
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
        <Button type="dashed" shape="circle" icon={<UnlockOutlined />} size="middle" />
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
        <Button
          type="text"
          shape="circle"
          icon={<DeleteOutlined />}
          size="small"
          danger
        />
      </Tooltip>
    </Space>
  );
};
