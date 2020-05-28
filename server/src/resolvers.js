module.exports = {
  Query: {
    me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
    tweet: async (_, { id }, { dataSources }) => dataSources.userAPI.getTweetById({ id }),
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      return user ? Buffer.from(email).toString('base64') : null;
    },
    addTweet: async (_, { text }, { dataSources }) => {
      const tweet = await dataSources.userAPI.addTweet({ text })
      const success = tweet && !!tweet.id && !!tweet.text
      return {
        success,
        message: success ? 'Tweet successful.' : `The tweet failed.`,
        tweet,
      }
    },
  },
};