// 1controller/orderCustomer.Controller.js

const OrderCustomerServices = require("../2service//orderCustomer.Service");

class OrderCustomerControllers {
  orderCustomerServices = new OrderCustomerServices();

  starOrderCustomerController = async (req, res) => {
    try {
      const startOrder =
        await this.orderCustomerServices.starOrderCustomerService();
      return res
        .status(startOrder.status)
        .json({ message: startOrder.message });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  orderCustomerController = async (req, res) => {
    try {
      const { orderItemID } = req.params;
      const { amount } = req.body;
      const result = await this.orderCustomerServices.orderCustomerServices(
        orderItemID,
        amount
      );
      console.log("result :", typeof result, result);
      if (result) {
        return res.status(result.status).json({ message: result.message });
      }
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };
}
module.exports = OrderCustomerControllers;
