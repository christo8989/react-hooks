const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore, decrypt } = require('./utils');
const isEmail = require('isemail');
const resolvers = require('./resolvers');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI({ store })
  }),
  context: async ({ req }) => {
    const auth = req.headers && req.headers.authorization || '';
    if (!auth) {
      return { user: null }
    }

    const base64Email = auth.split(".")[1]
    const email = decrypt(base64Email)
    if (!isEmail.validate(email)) {
      return { user: null };
    }

    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] || null;
    return { user: { ...user.dataValues } };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});