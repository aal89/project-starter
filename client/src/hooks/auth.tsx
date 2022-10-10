import { ApolloError } from '@apollo/client';
import { can as sharedCan, Permission } from '@project-starter/shared/build';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { useSignupMutation, useLoginMutation, UserModel } from '../graphql/generated/graphql';
import { Path } from '../routing/Path';
import { getAccessToken, setAccessToken, setRefreshToken } from '../tokens';

export const useAuth = () => {
  const navigate = useNavigate();
  const [signupMutation, { loading: signupLoading }] = useSignupMutation();
  const [loginMutation, { loading: loginLoading }] = useLoginMutation();

  const userFromToken: Readonly<UserModel> | null = useMemo(() => {
    try {
      const { user: decodedUser } = jwtDecode<{ user: UserModel }>(getAccessToken());

      return decodedUser;
    } catch {
      return null;
    }
  }, [getAccessToken()]);

  const userCan = (permission: Permission) => sharedCan(permission, userFromToken?.encodedPermissions ?? '');

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
    user: userFromToken,
    userCan,
    login,
    loginLoading,
    signup,
    signupLoading,
    logout,
    goHome,
    goLogin,
    goSignup,
    isLoggedIn,
  };
};
