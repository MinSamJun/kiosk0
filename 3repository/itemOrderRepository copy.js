//  3repository/itemOrderRepository.js

const Item = require("../0DB/models/item");
const Order_item = require("../0DB/models/order_item");
const { except } = require("../0DB/models/except");
const { sequelize } = require("../0DB/models");
const { QueryTypes } = require("sequelize");

class ItemOrderRepositories {
  //  발주 넣기
  // 품목 존재 확인
  getItemById = async (orderItemID) => {
    const isExist = await Item.findOne({
      where: {
        id: orderItemID,
      },
      attributes: except(),
    });
    // console.log(isExist, orderItemID);
    return isExist;
  };
  // 발주 넣기
  registerOrder = async (orderItemID, amount, state) => {
    console.log("amount :", typeof amount, amount);
    const addOrder = await Order_item.create({
      item_id: orderItemID,
      amount,
      state,
    });
    return addOrder;
  };

  //  발주 상태 업데이트
  // 발주 상태 확인
  getStatusById = async (orderID) => {
    const statusNow = await Order_item.findOne({
      where: { id: orderID },
      attributes: except(),
    });
    return statusNow;
  };
  // 발주 상태 갱신
  patchStatusById = async (orderID, state) => {
    const statusUpdate = await Order_item.update(
      {
        state,
      },
      {
        where: { id: orderID },
        attributes: except(),
      }
    );
    return statusUpdate;
  };
}

module.exports = ItemOrderRepositories;
