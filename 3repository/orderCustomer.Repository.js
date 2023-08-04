//  3repository/orderCustomerRepository.js

const Item = require("../0DB/models/item");
const Order_item = require("../0DB/models/order_item");
const { except } = require("../0DB/models/except");
// const { sequelize } = require("../0DB/models");
// models가 아니라 models에서 배열로 내보낸 Item의 sequelize를 가져와야한다...
const models = require("../0DB/models");
const sequelize = models[0].sequelize;
const { QueryTypes } = require("sequelize");

class orderCustomerRepositories {}

module.exports = orderCustomerRepositories;
