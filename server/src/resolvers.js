const { toDictionary } = require("./utils")

module.exports = {
  Query: {
    me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
    tweet: async (_, { id }, { dataSources }) => dataSources.userAPI.getTweetById({ id }),
    tweets: async (_, { userId }, { dataSources }) => {
      const currentUser = dataSources.userAPI.getContextUser()
      const tweetsToReverse = await dataSources.userAPI.getTweets({ userId })
      const tweets = tweetsToReverse.reverse()
      // TODO: Add Pagination
      const userIds = new Set(tweets.map(tweet => tweet.userId))
      const users = await dataSources.userAPI.getUsersByIds([...userIds])
      const userDictionary = users.reduce(toDictionary, {})
      for (let i = 0; i < tweets.length; ++i) {
        const { userId } = tweets[i]
        tweets[i].owner = userDictionary[userId]
        tweets[i].isOwner = currentUser.id === userId
      }
      
      return tweets
    }
  },
  Mutation: {
    // TODO: Change login back to a token/string
    login: async (_, { email }, { dataSources }) => dataSources.userAPI.findOrCreateUser({ email }),
    tweet: async (_, { id, text }, { dataSources }) => {
      const tweet = await dataSources.userAPI.tweet({ id, text })
      const success = tweet && !!tweet.id && !!tweet.text
      return {
        success,
        message: success ? 'Tweet successful.' : `The tweet failed.`,
        tweet,
      }
    },
  },
};