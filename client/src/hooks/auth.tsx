import { ApolloError } from '@apollo/client';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation, useLoginMutation } from '../graphql/generated/graphql';
import { Path } from '../routing/Path';
import { useStorageState } from './storage-state';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export type User = {
  id: string;
  username: string;
  name: string;
  lastName?: string;
};

export const useAuth = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useStorageState(ACCESS_TOKEN_KEY);
  const [, setRefreshToken] = useStorageState(REFRESH_TOKEN_KEY);
  const [signupMutation, { loading: signupLoading }] = useSignupMutation();
  const [loginMutation, { loading: loginLoading }] = useLoginMutation();

  const user = useMemo(() => {
    try {
      const { user: decodedUser } = jwtDecode<{ user: User }>(accessToken);

      return decodedUser;
    } catch {
      return null;
    }
  }, [accessToken]);

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

  const signup = async (username: string, password: string, name: string) => {
    try {
      await signupMutation({
        variables: {
          username,
          password,
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

  return {
    login,
    loginLoading,
    signup,
    signupLoading,
    logout,
    user,
    goHome,
    goLogin,
    goSignup,
  };
};
