//  0routes/itemsOrder.Routes.js

const express = require("express");
const router = express.Router();

const ItemOrderControllers = require("../1controller/itemOrder.Controller");
const itemOrderControllers = new ItemOrderControllers();

router.post("/order/:orderItemID", itemOrderControllers.itemOrderController);
router.patch(
  "/order/:orderID",
  itemOrderControllers.itemOrderUpdate_Controller
);

module.exports = router;
