const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Tweet {
    id: ID!
    userId: ID!
    text: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    me: User
    tweet(id: ID!): Tweet
    tweets(userId: ID): [Tweet]
  }

  type Mutation {
    login(email: String!): String # login token
    addTweet(text: String!): TweetUpdateResponse
  }

  type TweetUpdateResponse {
    success: Boolean!
    message: String!
    tweet: Tweet
  }
`;

module.exports = typeDefs;