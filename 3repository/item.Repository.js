//  3repository/itemRepository.js

const Item = require("../0DB/models/item");
// console.log("Items :", typeof Item, Item);
const { except } = require("../0DB/models/except");
const Sequelize = require("../0DB/dbSequelize");
const { QueryTypes } = require("sequelize");

class ItemRepositories {
  // 메뉴등록
  itemCreateRepository = async (name, price, type, option_id) => {
    const isExist = await Item.findOne({
      where: {
        name: name,
        type: type,
      },
      // 가져올 컬럼을 명시적으로 지정
      attributes: ["name", "type"],
    });
    if (isExist) {
      throw { message: "이미 존재하는 메뉴입니다." };
    } else {
      const addItem = await Item.create({
        name,
        price,
        type,
        option_id,
      });
      return addItem;
    }
  };

  itemInquiryRepository = async (orderFilter, orderSort) => {
    // console.log("orderFilter:", typeof orderFilter, orderFilter);

    let whereClause;
    if (orderFilter !== "all") {
      whereClause = { type: orderFilter };
    } else {
      whereClause = {};
    }

    const Inquiry = await Item.findAll({
      where: whereClause,
      attributes: except(),
    });

    return Inquiry;
  };

  itemAmountRepository = async (name) => {
    const itemAmount = await Item.findOne({
      where: { name: name },
      attributes: except(),
    });

    return itemAmount;
  };

  itemDeleteRepository = async (deleteId) => {
    try {
      const isDelete = await Item.destroy({
        where: { id: deleteId },
        attributes: { exclude: ["itemOrderCustomerId"] },
      });

      return isDelete;
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  itemUpdateRepository = async (name, nameToUpdate, price, type, amount) => {
    try {
      const post = await Item.update(
        {
          name: nameToUpdate,
          price,
          type,
          amount,
        },
        { where: { name } }
      );
      // 내보낸다.
      return post;
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = ItemRepositories;
