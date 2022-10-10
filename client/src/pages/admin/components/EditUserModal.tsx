import { PlusOutlined } from '@ant-design/icons';
import { decode, encode, Permission } from '@project-starter/shared/build';
import {
  AutoComplete,
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useEditUserMutation, UserModel } from '../../../graphql/generated/graphql';

const { Text } = Typography;

type EditUserModalProps = {
  user: UserModel;
  onClose?: (changes: boolean) => void;
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
  const [tags, setTags] = useState<Permission[]>([]);
  const [permissionsChanged, setPermissionsChanged] = useState(false);
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const inputRef = useRef<AutoCompleteRef>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [okDisabled, setOkDisabled] = useState(false);
  const [form] = useForm();
  const [editUserMutation, { loading }] = useEditUserMutation();

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
      setTimeout(() => onClose(form.isFieldsTouched() || permissionsChanged), 500);
    }
  }, [modalVisible]);

  useEffect(() => {
    setTags(decode(user.encodedPermissions));
    setOptions(allPermissions);
  }, []);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    setPermissionsChanged(true);
  };

  const onSearch = (searchText: string) => {
    const searchedPermissions = allPermissions.filter((p) => p.value.includes(searchText));
    setOptions(!searchText ? [] : searchedPermissions);
  };

  const handleInputConfirm = (permission: Permission) => {
    if (tags.indexOf(permission) === -1) {
      setTags([...tags, permission]);
      setPermissionsChanged(true);
    }
    setTagInputVisible(false);
  };

  const ok = async () => {
    try {
      await editUserMutation({
        variables: {
          input: {
            username: form.getFieldValue(['user', 'username']),
            lastName: form.getFieldValue(['user', 'lastName']),
            name: form.getFieldValue(['user', 'name']),
            email: form.getFieldValue(['user', 'email']),
            permissions: encode(tags),
            oldUsername: user.username,
          },
        },
      });
      setModalVisible(false);
    } catch (err) {
      message.error((err as Error).message);
    }
  };

  const onFieldsChange = async () => {
    const formValid = !!form.getFieldsError().flatMap((field) => field.errors).length;
    setOkDisabled(formValid);
  };

  return (
    <Modal
      title={(
        <Space>
          <Text strong>Edit user</Text>
          <small>
            <Text type="secondary">{user.id}</Text>
          </small>
        </Space>
      )}
      style={{ top: 20 }}
      visible={modalVisible}
      onOk={ok}
      onCancel={() => setModalVisible(false)}
      confirmLoading={loading}
      okButtonProps={{
        disabled: okDisabled,
      }}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        onFieldsChange={onFieldsChange}
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
        <Form.Item
          name={['user', 'email']}
          rules={[
            {
              required: true,
              message: 'E-mail cannot be empty',
            },
            { type: 'email', message: 'Not a valid e-mail address' },
          ]}
          label={<Text strong>Email</Text>}
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
      <small>
        <Text strong>Last online at:</Text>
        {' '}
        <Text italic>{user.lastOnlineAt}</Text>
        <br />
        <Text strong>Created at:</Text>
        {' '}
        <Text italic>{user.createdAt}</Text>
      </small>
    </Modal>
  );
};
