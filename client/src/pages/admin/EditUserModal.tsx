import { PlusOutlined } from '@ant-design/icons';
import { decode, Permission } from '@project-starter/shared/build';
import {
  AutoComplete, Button, Form, Input, Modal, Space, Tag, Tooltip, Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { User } from '../../graphql/generated/graphql';

const { Text } = Typography;

type EditUserModalProps = {
  user: User;
  onClose?: () => void;
};

type AutoCompleteRef = {
  focus: () => void;
  blur: () => void;
  scrollTo: (arg: any) => void;
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'Field is required',
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    range: 'Must be between ${min} and ${max} characters long',
  },
};
/* eslint-enable no-template-curly-in-string */

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const inputRef = useRef<AutoCompleteRef>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [okDisabled, setOkDisabled] = useState(false);
  const [form] = useForm();

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
    setTags(decode(user.encodedPermissions));
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
        <Space>
          <Text strong>Edit user</Text>
          <small>
            <Text type="secondary">
              {user.id}
            </Text>
          </small>
        </Space>
      )}
      style={{ top: 20 }}
      visible={modalVisible}
      onOk={() => {
        setModalVisible(false);
      }}
      onCancel={() => setModalVisible(false)}
      confirmLoading
      okButtonProps={{
        disabled: okDisabled,
      }}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        onFieldsChange={async () => {
          const formValid = !!form.getFieldsError().flatMap((field) => field.errors).length;
          setOkDisabled(formValid);
        }}
        name="nest-messages"
        form={form}
        layout="vertical"
        initialValues={{
          user,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          rules={[{ required: true }]}
          label={<Text strong>Name</Text>}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lastName']} label={<Text strong>Last name</Text>}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'username']}
          rules={[
            {
              required: true,
              type: 'string',
              min: 4,
              max: 20,
            },
          ]}
          label={<Text strong>Username</Text>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'permissions']}
          label={(
            <Space direction="vertical" size={0}>
              <Text strong>Permissions</Text>
              <small>
                <Text type="secondary">
                  Changes in permissions can take up to 10 minutes to come into effect.
                </Text>
              </small>
            </Space>
          )}
        >
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
                placeholder="Permission…"
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
