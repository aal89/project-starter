import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ACCESS_TOKEN_KEY } from './hooks/auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       users: {
    //         keyArgs: ['username', 'offset', 'limit'],
    //         merge(existing, incoming, { args }) {
    //           // Slicing is necessary because the existing data is
    //           // immutable, and frozen in development.
    //           const mergedUsers = existing?.users ? existing.users.slice(0) : [];
    //           // eslint-disable-next-line no-plusplus
    //           for (let i = 0; i < incoming.users.length; ++i) {
    //             mergedUsers[(args?.offset ?? 0) + i] = incoming.users[i];
    //           }

    //           return {
    //             total: incoming.total,
    //             users: mergedUsers,
    //           };
    //         },
    //         read(existing, options) {
    //           const offset = options.args?.offset;
    //           const limit = options.args?.limit;

    //           const selectedUsers = existing?.users.slice(offset, offset + limit) ?? [];

    //           return existing && !!selectedUsers.length && {
    //             total: (existing.total ?? 0),
    //             users: selectedUsers,
    //           };
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});
