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

export type GetListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListingsQuery = { __typename?: 'Query', listings: Array<{ __typename?: 'Listing', id: string, url: string, address: string } | null> };


export const GetListingsDocument = gql`
    query getListings {
  listings {
    id
    url
    address
  }
}
    `;

/**
 * __useGetListingsQuery__
 *
 * To run a query within a React component, call `useGetListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListingsQuery(baseOptions?: Apollo.QueryHookOptions<GetListingsQuery, GetListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, options);
      }
export function useGetListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListingsQuery, GetListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, options);
        }
export type GetListingsQueryHookResult = ReturnType<typeof useGetListingsQuery>;
export type GetListingsLazyQueryHookResult = ReturnType<typeof useGetListingsLazyQuery>;
export type GetListingsQueryResult = Apollo.QueryResult<GetListingsQuery, GetListingsQueryVariables>;