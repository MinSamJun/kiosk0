//  0routes/itemsOrderRoutes.js

const express = require("express");
const router = express.Router();

const ItemOrderControllers = require("../1controller/itemOrderController");
const itemOrderControllers = new ItemOrderControllers();

router.get("/order/:orderItemID", itemOrderControllers.itemOrderController);
router.patch(
  "/order/:orderID",
  itemOrderControllers.itemOrderUpdate_Controller
);

module.exports = router;
