import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { decode, encode, Permission } from '@project-starter/shared/build';
import {
  AutoComplete,
  Avatar,
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
import { FormattedMessage, useIntl } from 'react-intl';
import { useEditUserMutation, UserModel } from '../../../graphql/generated/graphql';
import { getFormatId } from '../../../locales';
import { getImageUrl } from '../../../user';

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
  const intl = useIntl();
  const [deleteImage, setDeleteImage] = useState(false);

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
            image: deleteImage ? null : user.image,
            permissions: encode(tags),
            oldUsername: user.username,
          },
        },
      });
      setModalVisible(false);
    } catch (err) {
      const { formatId, meta } = getFormatId(err);
      message.error(intl.formatMessage(formatId, meta));
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
          <Text strong>
            <FormattedMessage id="Admin.EditAccount.Modal.Title" />
          </Text>
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
      okText={intl.formatMessage({ id: 'Admin.EditAccount.Modal.Save' })}
      cancelText={intl.formatMessage({ id: 'Admin.EditAccount.Modal.Cancel' })}
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
        <Form.Item>
          <Space>
            <Avatar
              src={getImageUrl(user.image)}
              shape="circle"
              size={64}
              icon={<UserOutlined />}
            />
            <Button
              type={deleteImage ? 'primary' : 'ghost'}
              shape="round"
              size="small"
              onClick={() => setDeleteImage(!deleteImage)}
            >
              <FormattedMessage id="Admin.EditAccount.Modal.ImageDelete" />
            </Button>
          </Space>
        </Form.Item>
        <Form.Item
          name={['user', 'name']}
          rules={[{ required: true, message: intl.formatMessage({ id: 'Rules.Name.Required' }) }]}
          label={(
            <Text strong>
              <FormattedMessage id="Admin.EditAccount.Modal.Name" />
            </Text>
          )}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Rules.Email.Required' }),
            },
            { type: 'email', message: intl.formatMessage({ id: 'Rules.Name.Type' }) },
          ]}
          label={(
            <Text strong>
              <FormattedMessage id="Admin.EditAccount.Modal.Email" />
            </Text>
          )}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'lastName']}
          label={(
            <Text strong>
              <FormattedMessage id="Admin.EditAccount.Modal.Lastname" />
            </Text>
          )}
        >
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
              message: intl.formatMessage({ id: 'Rules.Username.Required' }),
            },
          ]}
          label={(
            <Text strong>
              <FormattedMessage id="Admin.EditAccount.Modal.Username" />
            </Text>
          )}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'permissions']}
          label={(
            <Space direction="vertical" size={0}>
              <Text strong>
                <FormattedMessage id="Admin.EditAccount.Modal.Permissions" />
              </Text>
              <small>
                <Text type="secondary">
                  <FormattedMessage id="Admin.EditAccount.Modal.Permission.Text" />
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
                <FormattedMessage id="Admin.EditAccount.Modal.Permission.Add" />
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
                placeholder={`${intl.formatMessage({
                  id: 'Admin.EditAccount.Modal.Permissions',
                })}…`}
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
        <Text strong>
          <FormattedMessage id="Admin.EditAccount.Modal.Lastonline" />
        </Text>
        {' '}
        <Text italic>{user.lastOnlineAt}</Text>
        <br />
        <Text strong>
          <FormattedMessage id="Admin.EditAccount.Modal.Createdat" />
        </Text>
        {' '}
        <Text italic>{user.createdAt}</Text>
      </small>
    </Modal>
  );
};
