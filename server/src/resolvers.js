module.exports = {
  Query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      return user ? Buffer.from(email).toString('base64') : null;
    },
  },
};