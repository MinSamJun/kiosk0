// 1controller.itemsController.js

const ItemServices = require("../2service/itemService");

class ItemControllers {
  ItemService = new ItemServices();

  // 메뉴 등록
  // 관리자 계정인증 없이 비밀번호만 입력 받는 이유 :
  // 키오스크의 특성상 회원가입이 필요없고, 관리자는 비밀번호입력으로만 판단이 가능해서.
  itemCreateController = async (req, res) => {
    const { name, price, type, passwrod } = req.body;
    const { status, message } = await this.ItemService.itemCreateService(
      name,
      price,
      type,
      passwrod
    );
    return res.status(status).json({ message });
  };
}

module.exports = ItemControllers;
