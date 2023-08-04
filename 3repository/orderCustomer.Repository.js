//  3repository/orderCustomerRepository.js

const Item = require("../0DB/models/item");
const Item_order_customer = require("../0DB/models/item_order_customer");
const { except } = require("../0DB/models/except");
// const { sequelize } = require("../0DB/models");
// models가 아니라 models에서 배열로 내보낸 Item의 sequelize를 가져와야한다...
const models = require("../0DB/models");
const sequelize = models[0].sequelize;
const { QueryTypes } = require("sequelize");

class orderCustomerRepositories {
  makeOrder = async (orderItemID, amount, price) => {
    console.log(orderItemID, amount, price);
    try {
      const makeOrder = await Item_order_customer.create({
        item_id: orderItemID,
        amount,
        price,
      });
      return makeOrder;
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = orderCustomerRepositories;
