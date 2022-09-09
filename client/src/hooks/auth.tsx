import { ApolloError } from '@apollo/client';
import { can as sharedCan, Permission } from '@project-starter/shared/build';
import { message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { useSignupMutation, useLoginMutation, User } from '../graphql/generated/graphql';
import { Path } from '../routing/Path';
import {
  getAccessToken, getUserFromStorage, setAccessToken, setRefreshToken,
} from '../storage';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [signupMutation, { loading: signupLoading }] = useSignupMutation();
  const [loginMutation, { loading: loginLoading }] = useLoginMutation();

  useEffect(() => {
    if (user === null) {
      setUser(userFromStorage);
    }
  });

  const userFromStorage = useMemo(() => {
    try {
      return JSON.parse(getUserFromStorage()) as User;
    } catch {
      return null;
    }
  }, [getUserFromStorage()]);

  const updateUser = (u: Partial<User>) => {
    setUser({
      id: '',
      name: '',
      username: '',
      email: '',
      encodedPermissions: '',
      lastOnlineAt: new Date(),
      createdAt: new Date(),
      ...user,
      ...u,
    });
  };

  const userCan = (permission: Permission) => sharedCan(permission, userFromStorage?.encodedPermissions ?? '');

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
        throw new Error('No login information found in response');
      }

      setAccessToken(data.login.accessToken);

      if (rememberMe) {
        setRefreshToken(data.login.refreshToken);
      }

      message.success('Logged in successfully!');
      goHome();
    } catch (err) {
      message.error((err as ApolloError).message ?? 'Unknown error');
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

      message.success('Account created successfully!');
      goLogin();
    } catch (err) {
      message.error((err as ApolloError).message ?? 'Unknown error');
    }
  };

  const logout = () => {
    client.clearStore();
    setUser(null);
    setAccessToken('');
    setRefreshToken('');
    message.info('Logged out successfully!');
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

  const isLoggedIn = () => !!getAccessToken();

  return {
    userCan,
    login,
    loginLoading,
    signup,
    signupLoading,
    logout,
    user,
    updateUser,
    goHome,
    goLogin,
    goSignup,
    isLoggedIn,
  };
};
