import {
  ApolloClient, createHttpLink, from, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { RefreshDocument } from './graphql/generated/graphql';
import { Path } from './routing/Path';
import {
  getAccessToken,
  isAccessTokenExpired,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './tokens';

const isOffline = (err: Error) => !navigator.onLine || (err instanceof TypeError && err.message === 'Network request failed');

const httpLinkUri = process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:8000/graphql';

const httpLink = createHttpLink({
  uri: httpLinkUri,
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

const refreshLink = new TokenRefreshLink<{
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
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  },
  handleError: (err) => {
    // if we're offline, just wait and let the user refresh some time later. if we're
    // online and it error'ed then logout and lets try again from there
    if (!isOffline(err)) {
      window.location.replace(Path.userLogout);
    }
  },
});

export const client = new ApolloClient({
  link: from([refreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const refreshClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
