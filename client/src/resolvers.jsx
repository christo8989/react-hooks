import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Mutation {
    saveLoginToken(token: String!): String
    logout(logout: Boolean): Boolean
  }
`;

export function initializeCache() {
  return {
    data: {
      isLoggedIn: !!localStorage.getItem('token'),
    },
  }
}

export const resolvers = {
  Mutation: {
    saveLoginToken: (_, { token }, { cache }) => {
      cache.writeData({
        data: {
          isLoggedIn: !!token,
        },
      });
      localStorage.setItem("token", token)
      return token
    },
    logout: (_, __, { cache }) => {
      localStorage.clear()
      cache.reset()
      cache.writeData({
        data: {
          isLoggedIn: false,
        },
      })
      return true;
    }
  },
};