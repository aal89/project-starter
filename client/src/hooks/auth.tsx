import { ApolloError } from '@apollo/client';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import { useMemo } from 'react';
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
  login: () => [(username: string, password: string) => void, () => void, { loading: boolean }];
  signup: () => [
    (username: string, password: string, name: string) => void,
    () => void,
    { loading: boolean },
  ];
  logout: () => void;
  user: User | null;
};

export const useAuth = (): AuthReturnType => {
  const navigate = useNavigate();
  const token = getToken();

  const user = useMemo(() => {
    if (!token) {
      return null;
    }

    try {
      const { user: decodedUser } = jwtDecode<{ user: User }>(token);

      return decodedUser;
    } catch {
      return null;
    }
  }, [token]);

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

        setToken(result.data?.login?.accessToken!);

        message.success('Logged in succesfully!');
        goHome();
      } catch (err) {
        message.error((err as ApolloError).message ?? 'Unknown error');
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
