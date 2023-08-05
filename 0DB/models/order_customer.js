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
      defaultValue: false,
    },
    fullPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

module.exports = Order_customer;
