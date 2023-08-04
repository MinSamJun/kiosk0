//  0DB/models/order_customer.js

const DataTypes = require("sequelize").DataTypes;
const connector = require("../dbSequelize");

const Order_customer = connector.sequelize.define(
  "order_customers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fullPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Order_customer;
