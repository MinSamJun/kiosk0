//  2service/orderCustomerService.js

const OrderCustomerRepository = require("../3repository/orderCustomer.Repository");
const ItemOrderRepositories = require("../3repository/itemOrder.Repository");

class OrderCustomerServices {
  orderCustomerRepository = new OrderCustomerRepository();
  ItemOrderRepositories = new ItemOrderRepositories();

  starOrderCustomerService = async () => {
    try {
      const orderId =
        await this.ItemOrderRepositories.starOrderCustomerRepository();
      return {
        status: 200,
        message: `주문 아이디 ${orderId.id} 생성완료`,
      };
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  orderCustomerServices = async (orderItemID, amount) => {
    try {
      if (!amount || amount === 0) {
        return {
          status: 400,
          message: "최소 1 개는 주문해 주셔야합니다.",
        };
      }

      // 발주때 만들어 둔 매서드 재활용
      const isExistItem = await this.ItemOrderRepositories.getItemById(
        orderItemID
      );
      if (!isExistItem) {
        return {
          status: 400,
          message: "상품의 이름을 확인해 주세요.",
        };
      }

      const makeOrder = await this.orderCustomerRepository.makeOrder(
        orderItemID,
        amount,
        isExistItem.price
      );
      console.log("서비스 :", makeOrder);
      if (!makeOrder) {
        return {
          status: 400,
          message: "주문 실패! 관리자에게 문의하세요.",
        };
      }
      let fullPrice = makeOrder.price * makeOrder.amount;
      await this.orderCustomerRepository.addFullPrice(fullPrice);
      return {
        status: 200,
        message: `결제하실 가격은 ${fullPrice} 원 입니다.`,
      };
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = OrderCustomerServices;
