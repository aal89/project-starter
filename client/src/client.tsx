import {
  ApolloClient, createHttpLink, from, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { RefreshDocument } from './graphql/generated/graphql';
import { ACCESS_TOKEN_KEY, isExpired, REFRESH_TOKEN_KEY } from './hooks/tokens';

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
const setAccessToken = (at: string) => localStorage.setItem(ACCESS_TOKEN_KEY, at);
const setRefreshToken = (rt: string) => localStorage.setItem(REFRESH_TOKEN_KEY, rt);
const isAccessTokenExpired = () => isExpired(getAccessToken());

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const refreshLink: TokenRefreshLink = new TokenRefreshLink<{
  accessToken: string;
  refreshToken: string;
}>({
  accessTokenField: 'refresh',
  isTokenValidOrUndefined: () => !isAccessTokenExpired() || getAccessToken() === '' || getRefreshToken() === '',
  fetchAccessToken: () => refreshClient
    .mutate({
      mutation: RefreshDocument,
      variables: { refreshToken: getRefreshToken() },
    })
    .then(
      ({ data }) => new Response(
        JSON.stringify({
          data,
        }),
      ),
    ),
  handleFetch: ({ accessToken, refreshToken }) => {
    console.log('debug', 'refreshed tokens!');
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  },
  handleError: (err) => {
    console.log(err);
    if (
      !navigator.onLine
      || (err instanceof TypeError && err.message === 'Network request failed')
    ) {
      console.log('debug', 'Offline -> do nothing 🍵');
    } else {
      console.log('debug', 'Online -> log out 👋');
    }
  },
});

export const client = new ApolloClient({
  link: from([refreshLink, authLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const refreshClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
