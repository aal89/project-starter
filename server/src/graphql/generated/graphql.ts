/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ImageUploadParameters: ResolverTypeWrapper<ImageUploadParameters>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedUsers: ResolverTypeWrapper<PaginatedUsers>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tokens: ResolverTypeWrapper<Tokens>;
  UserModel: ResolverTypeWrapper<UserModel>;
  UserModelInput: UserModelInput;
  Void: ResolverTypeWrapper<Scalars['Void']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  ImageUploadParameters: ImageUploadParameters;
  Int: Scalars['Int'];
  Mutation: {};
  PaginatedUsers: PaginatedUsers;
  Query: {};
  String: Scalars['String'];
  Tokens: Tokens;
  UserModel: UserModel;
  UserModelInput: UserModelInput;
  Void: Scalars['Void'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ImageUploadParametersResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageUploadParameters'] = ResolversParentTypes['ImageUploadParameters']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  activate?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationActivateArgs, 'code' | 'username'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'newPassword' | 'oldPassword'>>;
  changePasswordByCode?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationChangePasswordByCodeArgs, 'code' | 'newPassword' | 'username'>>;
  deleteAccount?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'id'>>;
  edit?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType, RequireFields<MutationEditArgs, 'user'>>;
  login?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  refresh?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationRefreshArgs, 'token'>>;
  requestPasswordReset?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationRequestPasswordResetArgs, 'email'>>;
  resetPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'id'>>;
  sendActivate?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationSendActivateArgs, 'email'>>;
  signup?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'name' | 'password' | 'username'>>;
};

export type PaginatedUsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedUsers'] = ResolversParentTypes['PaginatedUsers']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['UserModel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activeUsers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  getImageUploadUrl?: Resolver<ResolversTypes['ImageUploadParameters'], ParentType, ContextType, RequireFields<QueryGetImageUploadUrlArgs, 'contentType'>>;
  me?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType>;
  recentlyCreatedUsers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalUsers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<ResolversTypes['PaginatedUsers'], ParentType, ContextType, RequireFields<QueryUsersArgs, 'limit' | 'offset'>>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserModel'] = ResolversParentTypes['UserModel']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encodedPermissions?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastOnlineAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  ImageUploadParameters?: ImageUploadParametersResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedUsers?: PaginatedUsersResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  UserModel?: UserModelResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

