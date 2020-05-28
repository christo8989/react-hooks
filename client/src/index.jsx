import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { typeDefs, resolvers, initializeCache } from "./resolvers"

const cache = new InMemoryCache();
const link = new HttpLink({
  headers: { authorization: localStorage.getItem('token') },
  uri: "http://localhost:4000/graphql",
});
const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

cache.writeData(initializeCache());

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
