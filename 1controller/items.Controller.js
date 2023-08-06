// 1controller.itemsController.js

const ItemServices = require("../2service/item.Service");

class ItemControllers {
  ItemService = new ItemServices();

  // 메뉴 등록
  // 관리자 계정인증 없이 비밀번호만 입력 받는 이유 :
  // 키오스크의 특성상 회원가입이 필요없고, 관리자는 비밀번호입력으로만 판단이 가능해서.
  itemCreateController = async (req, res) => {
    const { name, price, type, option_id, passwrod } = req.body;
    const { status, message } = await this.ItemService.itemCreateService(
      name,
      price,
      type,
      option_id,
      passwrod
    );
    return res.status(status).json({ message });
  };

  itemInquiryController = async (req, res) => {
    const { orderFilter, orderSort, passwrod } = req.body;
    const { status, message, Inquiry } =
      await this.ItemService.itemInquiryService(
        orderFilter,
        orderSort,
        passwrod
      );
    return res.status(status).json({ message, Inquiry });
  };

  itemAmountController = async (req, res) => {
    const { name, passwrod } = req.body;
    const { status, message, deleteId, remainAmount } =
      await this.ItemService.itemAmountService(name, passwrod);

    // if (sureDelete === "1") {

    // }

    return res.status(status).json({ message, status, deleteId, remainAmount });
  };

  itemDestoryConroller = async (req, res) => {
    try {
      const { deleteId } = req.params;
      const { passwrod } = req.body;
      const { status, message } = await this.ItemService.itemDeleteService(
        deleteId,
        passwrod
      );
      return res.status(status).json({ message });
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };

  itemUdateConroller = async (req, res) => {
    try {
      const { name, nameToUpdate, price, type, amount, passwrod } = req.body;
      const { status, message } = await this.ItemService.itemUdateService(
        name,
        nameToUpdate,
        price,
        type,
        amount,
        passwrod
      );
      return res.status(status).json({ message });
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = ItemControllers;
