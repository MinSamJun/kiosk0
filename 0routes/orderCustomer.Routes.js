//  0routes/itemsOrder.Routes.js

const express = require("express");
const router = express.Router();

const OrderCustomerControllers = require("../1controller/orderCustomer.Controller");
const orderCustomerControllers = new ItemOrderControllers();

router.get(
  "/orderCustomer/:orderItemID",
  orderCustomerControllers.orderCustomerController
);

module.exports = router;
