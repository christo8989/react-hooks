const SQL = require('sequelize');

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 5,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) {
    return []
  }

  if (!cursor) {
    return results.slice(0, pageSize)
  }

  const cursorIndex = results.findIndex(item => {
    let itemCursor = item.cursor ? item.cursor : getCursor(item);
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
    $or: Op.or,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    email: SQL.STRING,
  });

  const tweets = db.define('tweet', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    userId: SQL.INTEGER,
    text: SQL.STRING,
  });

  return { users, tweets };
};

module.exports.toDictionary = (acc, user) => {
  acc[user.id] = user
  return acc
}

// NOTE: I know base64 isn't encryption...
module.exports.encrypt = (value) => {
  return Buffer.from(value).toString("base64")
}

module.exports.decrypt = (value) => {
  return Buffer.from(value, 'base64').toString('ascii')
}