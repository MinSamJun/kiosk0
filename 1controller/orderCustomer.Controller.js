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

      if (result) {
        return res.status(result.status).json({ message: result.message });
      }
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  orderCustomerPatch_Controller = async (req, res) => {
    try {
      const { orderID } = req.params;
      const { satus } = req.body;
      const orderPatch =
        await this.orderCustomerServices.orderCustomerPatch_Service(
          orderID,
          satus
        );
      return res
        .status(orderPatch.status)
        .json({ orderID: orderPatch.message });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };
}
module.exports = OrderCustomerControllers;
