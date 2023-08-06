//  0DB/models/item_order_customer.js

const DataTypes = require("sequelize").DataTypes;
const connector = require("../dbSequelize");

const Item_order_customer = connector.sequelize.define(
  "item_order_customers",
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

    order_customers_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    extra_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    shot_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    hot_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Item_order_customer;
