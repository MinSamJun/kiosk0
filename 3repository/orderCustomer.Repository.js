//  3repository/orderCustomerRepository.js

const Order_customer = require("../0DB/models/order_customer");
const Item_order_customer = require("../0DB/models/item_order_customer");
const { except } = require("../0DB/models/except");
// const { sequelize } = require("../0DB/models");
// models가 아니라 models에서 배열로 내보낸 Item의 sequelize를 가져와야한다...
const models = require("../0DB/models");
const sequelize = models[0].sequelize;
const { QueryTypes } = require("sequelize");

class orderCustomerRepositories {
  // 개별주문하기
  makeOrder = async (orderItemID, amount, price) => {
    try {
      const maxOrderIdResult = await sequelize.query(
        "SELECT MAX(id) AS maxId FROM order_customers;",
        { type: QueryTypes.SELECT }
      );
      const maxOrderId = maxOrderIdResult[0].maxId;

      const makeOrder = await Item_order_customer.create({
        item_id: orderItemID,
        amount,
        price,
        order_customers_id: maxOrderId,
      });
      return makeOrder;
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  // 개별주문 완료시 가격올리기
  addFullPrice = async (fullPrice) => {
    const maxOrderIdResult = await sequelize.query(
      "SELECT MAX(id) AS maxId FROM order_customers;",
      { type: QueryTypes.SELECT }
    );
    const maxOrderId = maxOrderIdResult[0].maxId;
    const addFullPrice = await Order_customer.increment(
      { fullPrice },
      { where: { id: maxOrderId } }
    );
    return addFullPrice;
  };
}

module.exports = orderCustomerRepositories;
