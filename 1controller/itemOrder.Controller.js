// 1controller.itemsOrderController.js

const ItemOrderServices = require("../2service/itemOrder.Service");

class ItemOrderControllers {
  itemOrderService = new ItemOrderServices();

  itemOrderController = async (req, res) => {
    try {
      const { orderItemID } = req.params;
      const { amount } = req.body;
      const result = await this.itemOrderService.itemOrderService(
        orderItemID,
        amount
      );
      if (result.data) {
        return res.status(result.status).json({ data: result.data });
      }
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  itemOrderUpdate_Controller = async (req, res) => {
    try {
      const { orderID } = req.params;
      const { status } = req.body;
      const result = await this.itemOrderService.itemOrderUpdate_Service(
        orderID,
        status
      );
      if (result.data) {
        return res.status(result.status).json({ data: result.data });
      }
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };
}
module.exports = ItemOrderControllers;
