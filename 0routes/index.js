// 0routes/index.js

const itemRouter = require("./items.Routes");
const itemOrderRouter = require("./itemOrder.Routes");
const ordercustomerRouter = require("./orderCustomer.Routes");

const express = require("express");
const router = express.Router();

const routers = [
  {
    path: "/item",
    router: itemRouter,
  },
  {
    path: "/itemOrder",
    router: itemOrderRouter,
  },
  {
    path: "/orderCustomer",
    router: ordercustomerRouter,
  },
];

routers.forEach((res) => {
  router.use(res.path, res.router);
});

module.exports = router;
