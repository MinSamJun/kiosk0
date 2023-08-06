//  3repository/orderCustomerRepository.js

const Order_customer = require("../0DB/models/order_customer");
const Item_order_customer = require("../0DB/models/item_order_customer");
const Item = require("../0DB/models/item");
const Option = require("../0DB/models/option");
const { except } = require("../0DB/models/except");
// const { sequelize } = require("../0DB/models");
// models가 아니라 models에서 배열로 내보낸 Item의 sequelize를 가져와야한다...
const models = require("../0DB/models");
const sequelize = models[0].sequelize;
const { QueryTypes } = require("sequelize");

class orderCustomerRepositories {
  // 옵션 가격
  optionPrice = async (option_id) => {
    const optionPrice = await Option.findOne({ when: { id: option_id } });
    return optionPrice;
  };

  // 개별주문하기
  makeOrder = async (
    orderItemID,
    amount,
    extra_TF,
    shot_amount,
    hot_TF,
    priceInOption
  ) => {
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
            extra_TF: extra_TF,
            shot_amount: shot_amount,
            hot_TF: hot_TF,
            amount: amount,
            price: priceInOption,
            order_customers_id: maxOrderId,
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
          { where: { id: maxOrderId }, transaction }
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
    console.log("주문상태바꾸기");
    try {
      return await sequelize.transaction(async (transaction) => {
        let orderComplete;
        const isOrderExist = await Order_customer.findOne({
          where: { id: orderID, state: false }, // state가 false인 경우에만 업데이트 수행
        });

        if (isOrderExist) {
          orderComplete = await Order_customer.update(
            { state: true },
            { where: { id: orderID }, transaction }
          );

          console.log("개별주문찾기");
          const itemOrderCustomers = await Item_order_customer.findAll({
            where: { order_customers_id: orderID },
            attributes: ["item_id", "order_customers_id", "amount"],
            transaction,
          });
          console.log(
            "itemOrderCustomers :",
            typeof itemOrderCustomers,
            itemOrderCustomers,
            itemOrderCustomers.length
          );

          for (let i = 0; i < itemOrderCustomers.length; i++) {
            const itemId = itemOrderCustomers[i].item_id;
            const amountToDecrease = itemOrderCustomers[i].amount;
            console.log("줄이기 회수");
            await Item.update(
              { amount: sequelize.literal(`amount - ${amountToDecrease}`) },
              { where: { id: itemId }, transaction }
            );
          }
          console.log("루프 통과");
        } else {
          console.log("이미 주문이 완료된 상태입니다.");
        }

        return orderComplete;
      });
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = orderCustomerRepositories;
