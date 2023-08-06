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

  orderCustomerServices = async (
    orderItemID,
    amount,
    extra_TF,
    shot_amount,
    hot_TF
  ) => {
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

      // 옵션 가격 만들기
      const OptionPrice = await this.orderCustomerRepository.optionPrice(
        isExistItem.option_id
      );

      let priceOfItem = isExistItem.extra_price;

      let optionPrice =
        OptionPrice.extra_price * Number(extra_TF) +
        OptionPrice.shot_price * shot_amount +
        OptionPrice.hot_price * Number(hot_TF);

      let priceInOption = isExistItem.price + optionPrice;

      const makeOrder = await this.orderCustomerRepository.makeOrder(
        orderItemID,
        amount,
        extra_TF,
        shot_amount,
        hot_TF,
        priceInOption
      );

      // console.log("makeOrder :", typeof makeOrder, makeOrder);

      if (!makeOrder) {
        return {
          status: 400,
          message: "주문 실패! 관리자에게 문의하세요.",
        };
      }
      let fullPrice = makeOrder.price * makeOrder.amount;
      // console.log("fullPrice :", typeof fullPrice, fullPrice);
      await this.orderCustomerRepository.addFullPrice(fullPrice);
      return {
        status: 200,
        message: `결제하실 가격은 ${fullPrice} 원 입니다.`,
      };
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  orderCustomerPatch_Service = async (orderID, satus) => {
    try {
      if (satus !== "true" && satus !== "false") {
        return {
          status: 400,
          message: `satusd의 값은 'true' 또는 'false' 로만 해주세요`,
        };
      }

      const isExistOrder =
        await this.orderCustomerRepository.isExistOrder_Repository(orderID);

      if (!isExistOrder) {
        return {
          status: 400,
          message: "주문 번호를 확인해주세요.",
        };
      }

      if (isExistOrder.state === true && satus === "false") {
        return {
          status: 400,
          message: "이미 서비스가 완료 된 경우 취소가 불가능합니다.",
        };
      } else if (isExistOrder.state === true && satus === "true") {
        return {
          status: 400,
          message: "이미 서비스가 완료 된 주문입니다.",
        };
      }

      const completeOrder =
        await this.orderCustomerRepository.completeOrder_Repository(orderID);

      return {
        status: 200,
        message: ` 주문번호 ${orderID} 서비스 완료.`,
      };
    } catch (err) {}
  };
}

module.exports = OrderCustomerServices;
