import { PlusOutlined } from '@ant-design/icons';
import { decode, Permission } from '@project-starter/shared/build';
import {
  AutoComplete,
  Form, Input, Modal, Tag, Tooltip,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BaseSelectRef } from 'rc-select';
import { User } from '../../graphql/generated/graphql';

type EditUserModalProps = {
  user: User;
  onClose?: () => void;
};

const allPermissions = Object.values(Permission);

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const inputRef = useRef<BaseSelectRef>(null);
  const [modalVisible, setmodalVisible] = useState(true);

  useEffect(() => {
    if (tagInputVisible) {
      inputRef.current?.focus();
    }
  }, [tagInputVisible]);

  useEffect(() => {
    if (onClose && !modalVisible) {
      setTimeout(() => onClose(), 500);
    }
  }, [modalVisible]);

  useEffect(() => {
    setTags(decode(user.permissions));
  }, []);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setTagInputVisible(true);
  };

  const handleInputConfirm = (permission: string) => {
    if (tags.indexOf(permission) === -1) {
      setTags([...tags, permission]);
    }
    setTagInputVisible(false);
  };

  return (
    <Modal
      title="Edit user"
      style={{ top: 20 }}
      visible={modalVisible}
      onOk={() => setmodalVisible(false)}
      onCancel={() => setmodalVisible(false)}
      okText="Edit"
      cancelText="Cancel"
    >
      <Form
        name="nest-messages"
        layout="vertical"
        initialValues={{
          user,
        }}
        // onFinish={onFinish}
        // validateMessages={validateMessages}
      >
        <Form.Item name={['user', 'id']} label="Id">
          <Input disabled />
        </Form.Item>
        <Form.Item name={['user', 'name']} label="Name">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lastName']} label="Last name">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'username']} label="Username">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'permissions']} label="Permissions">
          {tags.map((tag) => {
            const isLongTag = tag.length > 20;

            const tagElem = (
              <Tag className="edit-tag" key={tag} closable onClose={() => handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}…` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {tagInputVisible && (
            <AutoComplete
              ref={inputRef}
              options={allPermissions.map((perm) => ({ value: perm }))}
              style={{ width: 200 }}
              onSelect={handleInputConfirm}
              placeholder="input here"
            />
            // <Input
            //   ref={inputRef}
            //   type="text"
            //   size="small"
            //   className="tag-input"
            //   value={tagInputValue}
            //   onChange={handleInputChange}
            //   onBlur={handleInputConfirm}
            //   onPressEnter={handleInputConfirm}
            // />
          )}
          {!tagInputVisible && (
            <Tag className="site-tag-plus" onClick={showInput}>
              <PlusOutlined />
              {' '}
              Add permission
            </Tag>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
