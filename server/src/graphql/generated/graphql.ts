/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String'];
  askingPrice: Scalars['Int'];
  brokerage: Scalars['String'];
  city: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  livingSpace: Scalars['Int'];
  offeredSince?: Maybe<Scalars['String']>;
  pictures?: Maybe<Array<Maybe<Picture>>>;
  plotArea?: Maybe<Scalars['Int']>;
  postalCode: Scalars['String'];
  rooms: Scalars['Int'];
  saleDate?: Maybe<Scalars['String']>;
  saleDuration?: Maybe<Scalars['Int']>;
  thumbnail: Scalars['String'];
  url: Scalars['String'];
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  listings: Array<Maybe<Listing>>;
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
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Listing: ResolverTypeWrapper<Listing>;
  Picture: ResolverTypeWrapper<Picture>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Listing: Listing;
  Picture: Picture;
  Query: {};
  String: Scalars['String'];
};

export type ListingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Listing'] = ResolversParentTypes['Listing']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  askingPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  brokerage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  livingSpace?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offeredSince?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pictures?: Resolver<Maybe<Array<Maybe<ResolversTypes['Picture']>>>, ParentType, ContextType>;
  plotArea?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rooms?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  saleDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  saleDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PictureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Picture'] = ResolversParentTypes['Picture']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listings?: Resolver<Array<Maybe<ResolversTypes['Listing']>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Listing?: ListingResolvers<ContextType>;
  Picture?: PictureResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

