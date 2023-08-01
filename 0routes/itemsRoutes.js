//  0routes/itemsRoutes.js

const express = require("express");
const router = express.Router();

const ItemControllers = require("../1controller/itemsController");
const itemControllers = new ItemControllers();

router.post("/item", itemControllers.itemCreateController);
router.get("/item", itemControllers.itemInquiryController);

module.exports = router;
