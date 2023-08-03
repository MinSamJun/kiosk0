//  2service/itemOrderService.js

const ItemOrderRepositories = require("../3repository/itemOrderRepository");

class ItemOrderServices {
  ItemOrderRepositories = new ItemOrderRepositories();

  itemOrderService = async (orderItemID, amount) => {
    try {
      // 상품명은 DB를 봐야 알 수있지만, 수량은 미입력은 당장 가능하므로,
      // 수량 체크를 먼저한다.
      if (!amount) {
        return {
          status: 400,
          message: "발주량을 입력하세요.",
        };
      }
      const isExist = await this.ItemOrderRepositories.getItemById(orderItemID);
      if (!isExist) {
        return {
          status: 400,
          message: "상품의 이름을 확인해 주세요.",
        };
      }
      const state = "ORDERED";
      //   console.log("state :", typeof state, state);
      await this.ItemOrderRepositories.registerOrder(
        orderItemID,
        amount,
        state
      );
      return { status: 200, message: "발주가 완료되었습니다." };
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  itemOrderUpdate_Service = async (orderID, status) => {
    try {
      if (
        status !== "ORDERED" &&
        status !== "PENDING" &&
        status !== "COMPLETED" &&
        status !== "CANCELED"
      ) {
        return {
          status: 400,
          message:
            "적절한 발주 상태를 입력해주세요. (ORDERED, PENDING, COMPLETED, CANCELED)",
        };
      }

      const statusNow = await this.ItemOrderRepositories.getStatusById(
        orderID,
        status
      );
      if (statusNow.state === status) {
        return {
          status: 400,
          message: "발주를 같은 상태로 바꿀 수 없습니다.",
        };
      } else if (statusNow.state === "COMPLETED") {
        console.log("컴플상태");
        const itemAmount = await this.ItemOrderRepositories.getItemById(
          statusNow.item_id
        );
        console.log(itemAmount.amount, statusNow.amount);
        if (itemAmount.amount < statusNow.amount) {
          return {
            status: 400,
            message: "재고가 부족하여 반송할 수 없습니다.",
          };
        }
      }
      await this.ItemOrderRepositories.patchStatusById(orderID, status);
      return { status: 200, message: "발주 수정이 완료되었습니다." };
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = ItemOrderServices;
