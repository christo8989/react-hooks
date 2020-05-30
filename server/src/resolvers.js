const { toDictionary, encrypt } = require("./utils")

module.exports = {
  Query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.getContextUser(),
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
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email })
      const token = user && user.email && user.id 
        ? `${encrypt(user.id.toString())}.${encrypt(user.email)}`
        : "";
      return token
    },
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