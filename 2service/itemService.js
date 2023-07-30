//  2service/itemService.js

const ItemRepositories = require("../3repository/itemRepository");

class ItemServices {
  ItemRepositories = new ItemRepositories();

  // 메뉴 등록
  itemCreateService = async (name, price, type, passwrod) => {
    try {
      if (!name || !price || !type || !passwrod) {
        return {
          status: 400,
          message: "미입력된 항목이 있습니다. 모두 입력하여 주세요.",
        };
      } else if (passwrod !== "15228016") {
        return {
          status: 400,
          message: "비밀번호를 확인해주세요",
        };
      }
      const addItem = await this.ItemRepositories.itemCreateRepository(
        name,
        price,
        type
      );

      if (addItem) {
        return { status: 200, message: "메뉴 등록에 성공했습니다." };
      }
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = ItemServices;
