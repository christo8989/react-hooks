module.exports = {
  Query: {
    me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
    tweet: async (_, { id }, { dataSources }) => dataSources.userAPI.getTweetById({ id }),
    tweets: async (_, { userId }, { dataSources }) => {
      const tweets = await dataSources.userAPI.getTweets(userId ? { userId } : {})
      tweets.reverse()
      return tweets
    }
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (!user) {
        return null
      }

      user.token = Buffer.from(email).toString('base64')
      return user;
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