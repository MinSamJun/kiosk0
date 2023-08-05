//  0routes/itemsOrder.Routes.js

const express = require("express");
const router = express.Router();

const OrderCustomerControllers = require("../1controller/orderCustomer.Controller");
const orderCustomerControllers = new OrderCustomerControllers();

router.post(
  "/order/start",
  orderCustomerControllers.starOrderCustomerController
);
router.post(
  "/order/:orderItemID",
  orderCustomerControllers.orderCustomerController
);
router.patch(
  "/order/:orderID",
  orderCustomerControllers.orderCustomerPatch_Controller
);

module.exports = router;
