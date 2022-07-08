import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from '@apollo/client/utilities';
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
    typePolicies: {
      Query: {
        fields: {
          users: offsetLimitPagination(),
        },
      },
    },
  }),
});
