//  0DB/dbSequelize.js

const { Sequelize } = require("sequelize");
const config = require("../config/config.js");
require("dotenv").config();
const env = process.env;

class dbSequelize {
  constructor() {
    this.sequelize = new Sequelize(env.MYSQL_DB, env.MYSQL_ID, env.MYSQL_PW, {
      host: env.MYSQL_HOST,
      dialect: env.MYSQL_DIALECT,
    });
  }
  connectDB() {
    this.sequelize
      .sync()
      .then(() => {
        console.log("DB 연결 성공");
      })
      .catch((error) => {
        console.error(error);
        throw new Error("DB 연결 실패");
      });
  }
  testConnectDB() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("테스트 연결 성공");
      })
      .catch((error) => {
        console.error(error);
        throw new Error("테스트 연결 실패");
      });
  }
}
const dbConnect = new dbSequelize();

module.exports = dbConnect;
