/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  Void: void;
};

export type ImageUploadParameters = {
  __typename?: 'ImageUploadParameters';
  filename: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activate?: Maybe<Scalars['Void']>;
  changePassword?: Maybe<Scalars['Void']>;
  changePasswordByCode?: Maybe<Scalars['Void']>;
  deleteAccount?: Maybe<Scalars['Void']>;
  edit: UserModel;
  login: Tokens;
  refresh: Tokens;
  requestPasswordReset?: Maybe<Scalars['Void']>;
  resetPassword: Scalars['String'];
  sendActivate?: Maybe<Scalars['Void']>;
  signup?: Maybe<Scalars['Void']>;
};


export type MutationActivateArgs = {
  code: Scalars['String'];
  username: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationChangePasswordByCodeArgs = {
  code: Scalars['String'];
  newPassword: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  id: Scalars['String'];
};


export type MutationEditArgs = {
  user: UserModelInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRefreshArgs = {
  token: Scalars['String'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  id: Scalars['String'];
};


export type MutationSendActivateArgs = {
  email: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  total: Scalars['Int'];
  users: Array<UserModel>;
};

export type Query = {
  __typename?: 'Query';
  activeUsers: Scalars['Int'];
  getImageUploadUrl: ImageUploadParameters;
  me: UserModel;
  recentlyCreatedUsers: Scalars['Int'];
  totalUsers: Scalars['Int'];
  users: PaginatedUsers;
};


export type QueryGetImageUploadUrlArgs = {
  contentType: Scalars['String'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  username?: InputMaybe<Scalars['String']>;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UserModel = {
  __typename?: 'UserModel';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  encodedPermissions: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastOnlineAt: Scalars['Date'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type UserModelInput = {
  email?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  oldUsername?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserModelFieldsFragment = { __typename?: 'UserModel', id: string, username: string, name: string, lastName?: string | null, image?: string | null, email: string, encodedPermissions: string, lastOnlineAt: any, createdAt: any };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Tokens', accessToken: string, refreshToken: string } };

export type ActivateMutationVariables = Exact<{
  username: Scalars['String'];
  code: Scalars['String'];
}>;


export type ActivateMutation = { __typename?: 'Mutation', activate?: void | null };

export type SendActivateMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendActivateMutation = { __typename?: 'Mutation', sendActivate?: void | null };

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: void | null };

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'Tokens', accessToken: string, refreshToken: string } };

export type EditUserMutationVariables = Exact<{
  input: UserModelInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', edit: { __typename?: 'UserModel', id: string } };

export type EditMeMutationVariables = Exact<{
  name: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
}>;


export type EditMeMutation = { __typename?: 'Mutation', edit: { __typename?: 'UserModel', name: string, lastName?: string | null, image?: string | null } };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: void | null };

export type ChangePasswordByCodeMutationVariables = Exact<{
  username: Scalars['String'];
  code: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordByCodeMutation = { __typename?: 'Mutation', changePasswordByCode?: void | null };

export type ResetPasswordMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset?: void | null };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount?: void | null };

export type GetUsersQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', total: number, users: Array<{ __typename?: 'UserModel', id: string, username: string, name: string, lastName?: string | null, image?: string | null, email: string, encodedPermissions: string, lastOnlineAt: any, createdAt: any }> } };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename?: 'Query', totalUsers: number, activeUsers: number, recentlyCreatedUsers: number };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserModel', id: string, username: string, name: string, lastName?: string | null, image?: string | null, email: string, encodedPermissions: string, lastOnlineAt: any, createdAt: any } };

export type ImageUploadQueryVariables = Exact<{
  contentType: Scalars['String'];
}>;


export type ImageUploadQuery = { __typename?: 'Query', getImageUploadUrl: { __typename?: 'ImageUploadParameters', filename: string, url: string } };

export const UserModelFieldsFragmentDoc = gql`
    fragment UserModelFields on UserModel {
  id
  username
  name
  lastName
  image
  email
  encodedPermissions
  lastOnlineAt
  createdAt
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ActivateDocument = gql`
    mutation Activate($username: String!, $code: String!) {
  activate(username: $username, code: $code)
}
    `;
export type ActivateMutationFn = Apollo.MutationFunction<ActivateMutation, ActivateMutationVariables>;

/**
 * __useActivateMutation__
 *
 * To run a mutation, you first call `useActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateMutation, { data, loading, error }] = useActivateMutation({
 *   variables: {
 *      username: // value for 'username'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useActivateMutation(baseOptions?: Apollo.MutationHookOptions<ActivateMutation, ActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateMutation, ActivateMutationVariables>(ActivateDocument, options);
      }
export type ActivateMutationHookResult = ReturnType<typeof useActivateMutation>;
export type ActivateMutationResult = Apollo.MutationResult<ActivateMutation>;
export type ActivateMutationOptions = Apollo.BaseMutationOptions<ActivateMutation, ActivateMutationVariables>;
export const SendActivateDocument = gql`
    mutation SendActivate($email: String!) {
  sendActivate(email: $email)
}
    `;
export type SendActivateMutationFn = Apollo.MutationFunction<SendActivateMutation, SendActivateMutationVariables>;

/**
 * __useSendActivateMutation__
 *
 * To run a mutation, you first call `useSendActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendActivateMutation, { data, loading, error }] = useSendActivateMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendActivateMutation(baseOptions?: Apollo.MutationHookOptions<SendActivateMutation, SendActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendActivateMutation, SendActivateMutationVariables>(SendActivateDocument, options);
      }
export type SendActivateMutationHookResult = ReturnType<typeof useSendActivateMutation>;
export type SendActivateMutationResult = Apollo.MutationResult<SendActivateMutation>;
export type SendActivateMutationOptions = Apollo.BaseMutationOptions<SendActivateMutation, SendActivateMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($username: String!, $password: String!, $email: String!, $name: String!) {
  signup(username: $username, password: $password, email: $email, name: $name)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const RefreshDocument = gql`
    mutation Refresh($refreshToken: String!) {
  refresh(token: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const EditUserDocument = gql`
    mutation EditUser($input: UserModelInput!) {
  edit(user: $input) {
    id
  }
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const EditMeDocument = gql`
    mutation EditMe($name: String!, $lastName: String, $image: String) {
  edit(user: {name: $name, lastName: $lastName, image: $image}) {
    name
    lastName
    image
  }
}
    `;
export type EditMeMutationFn = Apollo.MutationFunction<EditMeMutation, EditMeMutationVariables>;

/**
 * __useEditMeMutation__
 *
 * To run a mutation, you first call `useEditMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMeMutation, { data, loading, error }] = useEditMeMutation({
 *   variables: {
 *      name: // value for 'name'
 *      lastName: // value for 'lastName'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useEditMeMutation(baseOptions?: Apollo.MutationHookOptions<EditMeMutation, EditMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMeMutation, EditMeMutationVariables>(EditMeDocument, options);
      }
export type EditMeMutationHookResult = ReturnType<typeof useEditMeMutation>;
export type EditMeMutationResult = Apollo.MutationResult<EditMeMutation>;
export type EditMeMutationOptions = Apollo.BaseMutationOptions<EditMeMutation, EditMeMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangePasswordByCodeDocument = gql`
    mutation ChangePasswordByCode($username: String!, $code: String!, $newPassword: String!) {
  changePasswordByCode(
    username: $username
    code: $code
    newPassword: $newPassword
  )
}
    `;
export type ChangePasswordByCodeMutationFn = Apollo.MutationFunction<ChangePasswordByCodeMutation, ChangePasswordByCodeMutationVariables>;

/**
 * __useChangePasswordByCodeMutation__
 *
 * To run a mutation, you first call `useChangePasswordByCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordByCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordByCodeMutation, { data, loading, error }] = useChangePasswordByCodeMutation({
 *   variables: {
 *      username: // value for 'username'
 *      code: // value for 'code'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordByCodeMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordByCodeMutation, ChangePasswordByCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordByCodeMutation, ChangePasswordByCodeMutationVariables>(ChangePasswordByCodeDocument, options);
      }
export type ChangePasswordByCodeMutationHookResult = ReturnType<typeof useChangePasswordByCodeMutation>;
export type ChangePasswordByCodeMutationResult = Apollo.MutationResult<ChangePasswordByCodeMutation>;
export type ChangePasswordByCodeMutationOptions = Apollo.BaseMutationOptions<ChangePasswordByCodeMutation, ChangePasswordByCodeMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($id: String!) {
  resetPassword(id: $id)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(email: $email)
}
    `;
export type RequestPasswordResetMutationFn = Apollo.MutationFunction<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, options);
      }
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>;
export type RequestPasswordResetMutationResult = Apollo.MutationResult<RequestPasswordResetMutation>;
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($id: String!) {
  deleteAccount(id: $id)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers($username: String, $offset: Int!, $limit: Int!) {
  users(username: $username, offset: $offset, limit: $limit) {
    total
    users {
      ...UserModelFields
    }
  }
}
    ${UserModelFieldsFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      username: // value for 'username'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const StatsDocument = gql`
    query Stats {
  totalUsers
  activeUsers
  recentlyCreatedUsers
}
    `;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserModelFields
  }
}
    ${UserModelFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ImageUploadDocument = gql`
    query ImageUpload($contentType: String!) {
  getImageUploadUrl(contentType: $contentType) {
    filename
    url
  }
}
    `;

/**
 * __useImageUploadQuery__
 *
 * To run a query within a React component, call `useImageUploadQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageUploadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageUploadQuery({
 *   variables: {
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useImageUploadQuery(baseOptions: Apollo.QueryHookOptions<ImageUploadQuery, ImageUploadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageUploadQuery, ImageUploadQueryVariables>(ImageUploadDocument, options);
      }
export function useImageUploadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageUploadQuery, ImageUploadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageUploadQuery, ImageUploadQueryVariables>(ImageUploadDocument, options);
        }
export type ImageUploadQueryHookResult = ReturnType<typeof useImageUploadQuery>;
export type ImageUploadLazyQueryHookResult = ReturnType<typeof useImageUploadLazyQuery>;
export type ImageUploadQueryResult = Apollo.QueryResult<ImageUploadQuery, ImageUploadQueryVariables>;