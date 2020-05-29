const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  getContextUser() {
    const user = this.context && this.context.user
    return user;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email = this.getContextUser()
      ? this.context.user.email 
      : emailArg

    if (!email || !isEmail.validate(email)) {
      return null
    }

    const users = await this.store.users.findCreateFind({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async getUserById(id) {
    const user = await this.store.users.findOne({
      where: { id }
    })
    return user && user.id && user.get()
  }

  async getUsersByIds(ids) {
    const $or = ids.map(id => ({ id }))
    const obj = {
      where: { $or }
    }
    const users = await this.store.users.findAll(obj)
    return users && users.length ? users.map(get) : []
  }

  async tweet({ id, text }) {
    const userId = this.context.user.id;
    const values = {
      userId,
      text,
    }

    if (id) {
      await this.store.tweets.update(values, { where: { id } })
    } else {
      const response = await this.store.tweets.create(values)
      if (!response || !response.id) {
        return false
      } else {
        id = response.id
      }
    }

    const tweet = await this.getTweetById({ id })
    return tweet;
  }

  async getTweetById({ id }) {
    const currentUser = this.getContextUser()
    if (!currentUser) {
      return false
    }

    const res = await this.store.tweets.findOne({
      where: { id }
    })
    if (!res || !res.id) {
      return false
    }

    const tweet = res.get()
    tweet.owner = await this.getUserById(tweet.userId)
    tweet.isOwner = tweet.owner.id === currentUser.id
    return tweet
  }

  async getTweets({ userId }) {
    const tweets = userId 
      ? await this.store.tweets.findAll({ where: { userId }})
      : await this.store.tweets.findAll()
    return tweets && tweets.length ? tweets.map(get) : []
  }
}

module.exports = UserAPI;


function get(obj) {
  return obj.get()
}
