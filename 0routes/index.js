// 0routes/index.js

const itemRouter = require("./itemsRoutes");
const itemOrderRouter = require("./itemOrderRoutes");

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
];

routers.forEach((res) => {
  router.use(res.path, res.router);
});

module.exports = router;
