import '@ant-design/pro-layout/dist/layout.min.css';
import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { client } from './client';
import './index.css';
import { AuthProvider } from './providers/auth';
import { Routing } from './routing/Routing';

document.title = process.env.REACT_APP_PROJECT_NAME ?? '';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
