import { PlusOutlined } from '@ant-design/icons';
import { decode, Permission } from '@project-starter/shared/build';
import {
  AutoComplete, Button, Form, Input, Modal, Space, Tag, Tooltip, Typography,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BaseSelectRef } from 'rc-select';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { User } from '../../graphql/generated/graphql';

const { Text } = Typography;

type EditUserModalProps = {
  user: User;
  onClose?: () => void;
};

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const inputRef = useRef<BaseSelectRef>(null);
  const [modalVisible, setmodalVisible] = useState(true);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const allPermissions = useMemo(
    () => Object.values(Permission).map((perm) => ({ value: perm })),
    [Permission],
  );

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

  const onSearch = (searchText: string) => {
    const searchedPermissions = allPermissions.filter((p) => p.value.includes(searchText));
    setOptions(!searchText ? [] : searchedPermissions);
  };

  const handleInputConfirm = (permission: string) => {
    if (tags.indexOf(permission) === -1) {
      setTags([...tags, permission]);
    }
    setTagInputVisible(false);
  };

  return (
    <Modal
      title={(
        <>
          <Text strong>Edit user</Text>
          {' '}
          <Text type="secondary">{user.id}</Text>
        </>
      )}
      style={{ top: 20 }}
      visible={modalVisible}
      onOk={() => setmodalVisible(false)}
      onCancel={() => setmodalVisible(false)}
      okText="Save"
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
        <Form.Item name={['user', 'name']} label={<Text strong>Name</Text>}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lastName']} label={<Text strong>Last name</Text>}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'username']} label={<Text strong>Username</Text>}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'permissions']} label={<Text strong>Permissions</Text>}>
          <Space direction="vertical">
            {!tagInputVisible && (
              <Button
                type="link"
                shape="round"
                size="small"
                onClick={() => setTagInputVisible(true)}
              >
                <PlusOutlined />
                {' '}
                Add permission
              </Button>
            )}
            {tagInputVisible && (
              <AutoComplete
                ref={inputRef}
                options={options}
                style={{ width: 200 }}
                onSelect={handleInputConfirm}
                onSearch={onSearch}
                onBlur={() => {
                  setTagInputVisible(false);
                  setOptions(allPermissions);
                }}
                placeholder="Permission..."
              />
            )}
            <Space size={0}>
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
            </Space>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
