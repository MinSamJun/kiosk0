//  2service/itemService.js

const ItemRepositories = require("../3repository/itemRepository");

class ItemServices {
  ItemRepositories = new ItemRepositories();

  // 메뉴 등록
  itemCreateService = async (name, price, type, passwrod) => {
    try {
      if (passwrod !== "15228016") {
        return {
          status: 400,
          message: "비밀번호를 확인해주세요",
        };
      } else if (!name) {
        return {
          status: 400,
          message: "상품의 이름을 입력하여 주세요.",
        };
      } else if (price < 0 && !price) {
        return {
          status: 400,
          message: "상품의 가격을 0 이상으로 입력해주세요.",
        };
      } else if (type !== "coffee" && type !== "juice" && type !== "food") {
        return {
          status: 400,
          message: "상품의 카테고리를 제대로 입력해주세요.",
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

  itemInquiryService = async (orderFilter, orderSort) => {
    try {
      if (
        orderFilter !== "all" &&
        orderFilter !== "coffee" &&
        orderFilter !== "juice" &&
        orderFilter !== "food"
      ) {
        return {
          status: 400,
          message: "조회할 카테고리를 제대로 입력해주세요.",
        };
      } else if (
        orderSort !== "name" &&
        orderSort !== "price" &&
        orderSort !== "type" &&
        orderSort !== "amount"
      ) {
        return {
          status: 400,
          message: "정렬할 기준을 제대로 입력해주세요.",
        };
      }

      const Inquiry = await this.ItemRepositories.itemInquiryRepository(
        orderFilter,
        orderSort
      );

      if (Inquiry) {
        return { status: 200, message: "메뉴 조회에 성공했습니다.", Inquiry };
      }
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = ItemServices;
