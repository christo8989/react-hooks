import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { typeDefs, resolvers, initializeCache } from "./resolvers"
import { ApolloLink } from 'apollo-link';
import App from './App';

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token || "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
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
