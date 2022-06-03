import { ApolloError } from '@apollo/client';
import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../graphql/generated/graphql';
import { Path } from '../routing/Path';

export type User = {
  name: string;
  roles: string[];
  permissions: string[];
};

type AuthReturnType = {
  login: () => [
    (email: string, password: string) => void,
    { done: boolean; loading: boolean; error?: ApolloError },
  ];
  navigateLogin: () => void;
  navigateLogout: () => void;
  navigateCreate: () => void;
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isLoggedIn: () => boolean;
};

export const useAuth = (): AuthReturnType => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();

  const login = () => {
    const [loginFn, { data, loading, error }] = useLoginMutation();
    const [done, setDone] = useState(false);

    useEffect(() => {
      if (data) {
        console.log('intercept', data);
        setDone(true);
      }
    }, [data]);

    const doLogin = (email: string, password: string) => {
      loginFn({
        variables: {
          email,
          password,
        },
      });
    };

    return [doLogin, { done, loading, error }] as [
      (email: string, password: string) => void,
      { done: boolean; loading: boolean; error?: ApolloError },
    ];
  };

  const navigateLogin = () => {
    navigate(Path.userLogin);
  };

  const navigateLogout = () => {
    navigate(Path.userLogout);
  };

  const navigateCreate = () => {
    navigate(Path.userCreate);
  };

  const isLoggedIn = () => !!user;

  return {
    login,
    navigateLogin,
    navigateLogout,
    navigateCreate,
    user,
    setUser,
    isLoggedIn,
  };
};
