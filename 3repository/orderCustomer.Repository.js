//  3repository/orderCustomerRepository.js

const Order_customer = require("../0DB/models/order_customer");
const Item_order_customer = require("../0DB/models/item_order_customer");
const Item = require("../0DB/models/item");
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
      return await sequelize.transaction(async (transaction) => {
        const maxOrderIdResult = await Order_customer.findOne({
          attributes: [[sequelize.fn("MAX", sequelize.col("id")), "maxId"]],
          raw: true,
          transaction,
        });

        const maxOrderId = maxOrderIdResult.maxId || 0;

        const makeOrder = await Item_order_customer.create(
          {
            item_id: orderItemID,
            amount,
            price,
            order_customers_id: maxOrderId + 1,
          },
          { transaction }
        );

        return makeOrder;
      });
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  // 개별주문 완료시 가격올리기
  addFullPrice = async (fullPrice) => {
    try {
      return await sequelize.transaction(async (transaction) => {
        const maxOrderIdResult = await Order_customer.findOne({
          attributes: [[sequelize.fn("MAX", sequelize.col("id")), "maxId"]],
          raw: true,
          transaction,
        });

        const maxOrderId = maxOrderIdResult.maxId || 0;

        const addFullPrice = await Order_customer.increment(
          { fullPrice },
          { where: { id: maxOrderId + 1 }, transaction }
        );

        return addFullPrice;
      });
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  //  주문 상태 바꾸기
  // 주문 존재 여부 확인
  isExistOrder_Repository = async (orderID) => {
    const isExistOrder = await Order_customer.findOne({
      where: { id: orderID },
    });
    return isExistOrder;
  };
  // 주문 상태 바꾸기
  completeOrder_Repository = async (orderID) => {
    try {
      return await sequelize.transaction(async (transaction) => {
        const orderComplete = await Order_customer.update(
          { state: true },
          { where: { id: orderID }, transaction }
        );

        const itemOrderCustomers = await Item_order_customer.findAll({
          where: { order_customers_id: orderID },
          attributes: ["item_id", "order_customers_id", "amount"],
          transaction,
        });

        for (const itemOrderCustomer of itemOrderCustomers) {
          const itemId = itemOrderCustomer.item_id;
          const amountToDecrease = itemOrderCustomer.amount;

          await Item.update(
            { amount: sequelize.literal(`amount - ${amountToDecrease}`) },
            { where: { id: itemId }, transaction }
          );
        }

        return orderComplete;
      });
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

// // 삭제용
// await Item_order_customer.destroy({
//   where: { order_customers_id: orderID },
// });

// // 감소용
// const orderItems = await Item_order_customer.findAll({
//   where: { order_customers_id: orderID },
// });
// console.log("orderItems :", typeof orderItems, orderItems);
// for (const orderItem of orderItems) {
//   const item = await Item.findOne({ where: { id: orderItem.item_id } });
//   if (item) {
//     const minuamount = -orderItem.amount;
//     await Item.increment(
//       { amount: minuamount },
//       { where: { id: orderItem.item_id } }
//     );
//   }
// }

module.exports = orderCustomerRepositories;
