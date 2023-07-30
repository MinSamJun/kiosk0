//  3repository/itemRepository.js

const Item = require("../0DB/models/item");
console.log("Items :", typeof Item, Item);
const { sequelize } = require("../0DB/models");
const { QueryTypes } = require("sequelize");

class ItemRepositories {
  // 메뉴등록
  itemCreateRepository = async (name, price, type) => {
    console.log("함수내 Item :", typeof Item, Item);
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
      });
      return addItem;
    }
  };
}

module.exports = ItemRepositories;
