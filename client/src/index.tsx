import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { Routing } from './routing/Routing';
import { client } from './client';
import { LOGGEDIN_REDIRECT } from './constants';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-bvddqmhe.us.auth0.com"
      clientId="xxHE0KSjvjg5gBih0hLOciyWNHEQEAhO"
      redirectUri={LOGGEDIN_REDIRECT}
      audience="https://dev-bvddqmhe.us.auth0.com/api/v2/"
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
