import '@ant-design/pro-layout/dist/layout.min.css';
import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { client } from './client';
import './index.css';
import { Routing } from './routing/Routing';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
