//  0routes/option.routes.js

const express = require("express");
const router = express.Router();

const OptionControllers = require("../1controller/option.cotroller");
const optionControllers = new OptionControllers();

router.post("/option", optionControllers.optionCreateController);

module.exports = router;
