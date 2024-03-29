import { can as sharedCan, Permission } from '@project-starter/shared/build';
import { message } from 'antd';
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import {
  useSignupMutation,
  useLoginMutation,
  useMeLazyQuery,
  UserModel,
  useActivateMutation,
} from '../graphql/generated/graphql';
import { getFormatId } from '../locales';
import { Path } from '../routing/Path';
import {
  getAccessToken, getUserFromToken, isExpired, setAccessToken, setRefreshToken,
} from '../tokens';

type Auth = {
  user: UserModel | null;
  isLoggedIn: boolean;
  activate: (username: string, code: string) => Promise<void>;
  activateLoading: boolean;
  userCan: (permission: Permission) => boolean;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  loginLoading: boolean;
  signup: (username: string, password: string, email: string, name: string) => Promise<void>;
  signupLoading: boolean;
  logout: () => void;
  goHome: () => void;
  goLogin: () => void;
  goSignup: () => void;
};

export const AuthContext = createContext<Auth>({
  user: null,
  isLoggedIn: false,
  activate: () => Promise.reject(),
  activateLoading: false,
  userCan: () => false,
  login: () => Promise.reject(),
  loginLoading: false,
  signup: () => Promise.reject(),
  signupLoading: false,
  logout: () => {},
  goHome: () => {},
  goLogin: () => {},
  goSignup: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [activateMutation, { loading: activateLoading }] = useActivateMutation();
  const [signupMutation, { loading: signupLoading }] = useSignupMutation();
  const [loginMutation, { loading: loginLoading }] = useLoginMutation();
  const [meQuery, { data: meData, refetch: refetchMe }] = useMeLazyQuery();
  const [user, setUser] = useState<UserModel | null>(null);

  const tokenUser = getUserFromToken(getAccessToken());

  const isLoggedIn = useMemo(() => {
    const at = getAccessToken();
    if (at && !isExpired(at)) {
      return true;
    }

    return false;
  }, [getAccessToken()]);

  useEffect(() => {
    if (getAccessToken()) {
      meQuery();
    }
  }, []);

  useEffect(() => {
    if (meData) {
      setUser(meData.me);
    }
  }, [meData]);

  const userCan = (permission: Permission) => sharedCan(permission, (user ?? tokenUser)?.encodedPermissions ?? '');

  const login = async (username: string, password: string, rememberMe: boolean) => {
    try {
      const { data } = await loginMutation({
        variables: {
          username,
          password,
        },
      });

      // This shouldn't ever happen when login is succesful, so assert for it
      if (!data?.login) {
        throw new Error(intl.formatMessage({ id: 'Auth.Login.MissingData' }));
      }

      setAccessToken(data.login.accessToken);

      if (rememberMe) {
        setRefreshToken(data.login.refreshToken);
      }

      refetchMe();

      message.success(intl.formatMessage({ id: 'Auth.Login.Success' }));
      goHome();
    } catch (err) {
      const { formatId, meta } = getFormatId(err);
      message.error(intl.formatMessage(formatId, meta));
    }
  };

  const activate = async (username: string, code: string) => {
    try {
      await activateMutation({
        variables: {
          username,
          code,
        },
      });

      goLogin();
      message.success(intl.formatMessage({ id: 'Auth.Activate.Success' }));
    } catch (err) {
      const { formatId, meta } = getFormatId(err);
      message.error(intl.formatMessage(formatId, meta));
    }
  };

  const signup = async (username: string, password: string, email: string, name: string) => {
    try {
      await signupMutation({
        variables: {
          username,
          password,
          email,
          name,
        },
      });

      message.success(intl.formatMessage({ id: 'Auth.Signup.Success' }));
      goLogin();
    } catch (err) {
      const { formatId, meta } = getFormatId(err);
      message.error(intl.formatMessage(formatId, meta));
    }
  };

  const logout = () => {
    client.clearStore();
    setUser(null);
    setAccessToken('');
    setRefreshToken('');
    message.info(intl.formatMessage({ id: 'Auth.Logout.Success' }));
    goHome();
  };

  const goHome = () => {
    navigate(Path.home);
  };

  const goLogin = () => {
    navigate(Path.userLogin);
  };

  const goSignup = () => {
    navigate(Path.userSignup);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        activate,
        activateLoading,
        userCan,
        login,
        loginLoading,
        signup,
        signupLoading,
        logout,
        goHome,
        goLogin,
        goSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
