const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String): String # login token
  }
`;

module.exports = typeDefs;