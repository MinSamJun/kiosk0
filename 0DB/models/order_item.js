//  0DB/models/order_item.js

const DataTypes = require("sequelize").DataTypes;
const connector = require("../dbSequelize");

const orderItemState = {
  ORDERED: 0,
  PENDING: 1,
  COMPLETED: 2,
  CANCELED: 3,
};

const Order_item = connector.sequelize.define(
  "order_items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM(Object.values(orderItemState)),
      allowNull: false,
      defaultValue: orderItemState.ORDERED,
    },
  },
  { timestamps: true }
);

module.exports = Order_item;
