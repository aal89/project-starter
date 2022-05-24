import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../routing/Path';

export type User = {
  name: string;
  roles: string[];
  permissions: string[];
};

type AuthReturnType = {
  login: () => void,
  logout: () => void,
  user: User | undefined,
  setUser: Dispatch<SetStateAction<User | undefined>>,
  isLoggedIn: () => boolean,
};

export const useAuth = (): AuthReturnType => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();

  const login = () => {
    navigate(Path.userLogin);
  };

  const logout = () => {
    navigate(Path.userLogout);
  };

  const isLoggedIn = () => !!user;

  return {
    login, logout, user, setUser, isLoggedIn,
  };
};
