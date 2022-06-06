import { ApolloError } from '@apollo/client';
import { message } from 'antd';
import * as jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSignupMutation } from '../graphql/generated/graphql';
import { Path } from '../routing/Path';
import { getToken, removeToken, setToken } from '../token';

export type User = {
  id: string;
  username: string;
  name: string;
};

type AuthReturnType = {
  login: () => [
    (username: string, password: string) => void,
    () => void,
    { loading: boolean },
  ];
  signup: () => [
    (username: string, password: string, name: string) => void,
    () => void,
    { loading: boolean },
  ];
  logout: () => void;
  user?: User;
};

export const useAuth = (): AuthReturnType => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    // if we don't have an user in memory, but we have a token, then we're
    // logged in and we should reset the user object with the one from the
    // token
    const token = getToken();
    if (!user && token) {
      try {
        const { user: u } = jwtDecode.default<{ user: User }>(token);
        console.log('debug', 'useEffect', u);
        setUser(() => u);
      } catch {
        // if the token decoding went wrong for w/e reason then logout and
        // not try this again
        logout();
      }
    }
  }, []);

  const goHome = () => {
    navigate(Path.home);
  };

  const goLogin = () => {
    navigate(Path.userLogin);
  };

  const goSignup = () => {
    navigate(Path.userSignup);
  };

  const login = () => {
    const [loginFn, { loading }] = useLoginMutation();

    const doLogin = async (username: string, password: string) => {
      try {
        const result = await loginFn({
          variables: {
            username,
            password,
          },
        });

        console.log('debug', 'doLogin', result.data?.login?.user);

        setUser(() => result.data?.login?.user!);
        setToken(result.data?.login?.accessToken!);

        message.success('Logged in succesfully!', 1.5);
        goHome();
      } catch (err) {
        message.error((err as ApolloError).message ?? 'Unknown error', 1.5);
      }
    };

    return [doLogin, goLogin, { loading }] as [
      (username: string, password: string) => void,
      () => void,
      { loading: boolean },
    ];
  };

  const signup = () => {
    const [signupFn, { loading }] = useSignupMutation();

    const doSignup = async (username: string, password: string, name: string) => {
      try {
        await signupFn({
          variables: {
            username,
            password,
            name,
          },
        });

        message.success('Account created succesfully!', 1.5);
        goLogin();
      } catch (err) {
        message.error((err as ApolloError).message ?? 'Unknown error', 1.5);
      }
    };

    return [doSignup, goSignup, { loading }] as [
      (username: string, password: string, name: string) => void,
      () => void,
      { loading: boolean },
    ];
  };

  const logout = () => {
    removeToken();
    setUser(() => undefined);
    message.info('Logged out succesfully');
    goHome();
  };

  return {
    login,
    signup,
    logout,
    user,
  };
};
