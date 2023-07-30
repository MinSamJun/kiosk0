//  0DB/models/item_order_customer.js

const DataTypes = require("sequelize").DataTypes;
const connector = require("../dbSequelize");

const Item_order_customer = connector.sequelize.define(
  "item_order_customer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Item_order_customer;
