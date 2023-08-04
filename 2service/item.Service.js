//  2service/itemService.js

const ItemRepositories = require("../3repository/item.Repository");
// const itemType = require("../0DB/models/item");

// console.log("itemType :", typeof itemType, itemType);

// 값을 입력받기 위함
const readline = require("readline");

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

  itemAmountService = async (name) => {
    const isSoldOut = await this.ItemRepositories.itemAmountRepository(name);
    try {
      // let sureDelete = "0";

      // if (isSoldOut.amount !== 0) {
      //   sureDelete = await this.getYesOrNoInput(name);
      // } else if (isSoldOut.amount === 0) {
      //   sureDelete = "1";
      // }

      const remainAmount = isSoldOut.amount;
      const deleteId = isSoldOut.id;

      return {
        status: 200,
        message: "메뉴 수량 조회 완료",
        deleteId,

        // isSoldOut,
        // sureDelete,
      };
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  // async getYesOrNoInput(name) {
  //   const rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   });

  //   return new Promise((resolve) => {
  //     rl.question(
  //       `현재  '${name}'메뉴의 잔량이 있습니다. 삭제하시겠습니까? 삭제를 원하면 "1"를 입력해주세요: `,
  //       (answer) => {
  //         rl.close();
  //         resolve(answer === "1" ? 1 : 0);
  //       }
  //     );
  //   });
  // }

  itemDeleteService = async (deleteId) => {
    const isDelete = await this.ItemRepositories.itemDeleteRepository(deleteId);
    try {
      if (isDelete) {
        return {
          status: 200,
          message: `메뉴 ID : ${deleteId}의 삭제에 성공하였습니다.`,
        };
      }
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  itemUdateService = async (name, nameToUpdate, price, type, amount) => {
    try {
      if (!name) {
        return {
          status: 400,
          message: `메뉴명은 필수 입력 값입니다.`,
        };
      }
      if (!nameToUpdate) {
        nameToUpdate = name;
      }

      if (price < 0) {
        return {
          status: 400,
          message: `가격은 음수(마이너스)일 수 없습니다.`,
        };
      }

      if (type !== "coffee" && type !== "juice" && type !== "food") {
        return {
          status: 400,
          message: "타입은 coffee , juice , food 중 하나여야합니다.",
        };
      }
    } catch (err) {
      return { status: 400, message: err.message };
    }

    const isUpdated = await this.ItemRepositories.itemUpdateRepository(
      name,
      nameToUpdate,
      price,
      type,
      amount
    );
    try {
      if (isUpdated) {
        return {
          status: 200,
          message: `메뉴 이름 : ${name}의 수정에 성공하였습니다.`,
        };
      }
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = ItemServices;
