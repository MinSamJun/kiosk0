//  0DB/models/option.js

const DataTypes = require("sequelize").DataTypes;
const connector = require("../dbSequelize");

const Option = connector.sequelize.define(
  "item_order_customers",
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

module.exports = Option;
