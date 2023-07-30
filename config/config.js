//  config/config.js

require("dotenv").config();
const env = process.env;

module.exports = {
  development: {
    username: env.MYSQL_ID,
    password: env.MYSQL_PW,
    database: env.MYSQL_DB,
    host: env.MYSQL_HOST,
    dialect: env.MYSQL_DIALECT,
  },

  production: {
    username: env.MYSQL_ID,
    password: env.MYSQL_PW,
    database: env.MYSQL_DB,
    host: env.MYSQL_HOST,
    dialect: env.MYSQL_DIALECT,
  },

  test: {
    username: env.MYSQL_ID,
    password: env.MYSQL_PW,
    database: env.MYSQL_DB_TEST,
    host: env.MYSQL_HOST,
    dialect: env.MYSQL_DIALECT,
  },
};
