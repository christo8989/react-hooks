import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Mutation {
    saveToken(token: String!): String
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
    saveToken: (_, { token }, { cache }) => {
      localStorage.setItem("token", token)
      cache.writeData({
        data: {
          isLoggedIn: !!token,
        },
      });
      return token
    },
  },
};