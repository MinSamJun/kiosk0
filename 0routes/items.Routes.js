//  0routes/itemsRoutes.js

const express = require("express");
const router = express.Router();

const ItemControllers = require("../1controller/items.Controller");
const itemControllers = new ItemControllers();

router.post("/item", itemControllers.itemCreateController);
router.get("/item", itemControllers.itemInquiryController);
router.get("/amount", itemControllers.itemAmountController);
router.delete("/delete/:deleteId", itemControllers.itemDestoryConroller);
router.patch("/update", itemControllers.itemUdateConroller);

module.exports = router;
