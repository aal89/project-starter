import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { User } from '../../graphql/generated/graphql';

type EditUserModalProps = {
  user: User;
  onClose?: (user: User) => void;
};

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (onClose && !visible) {
      setTimeout(() => onClose({ ...user, name: 'updated' }), 500);
    }
  }, [visible]);

  return (
    <Modal
      title="Edit user"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      okText="Edit"
      cancelText="Cancel"
    >
      <p>{user.name}</p>
    </Modal>
  );
};
