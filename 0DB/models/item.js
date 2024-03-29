//  0DB/models/item.js

const DataTypes = require("sequelize").DataTypes;
const connector = require("../dbSequelize");

const itemType = {
  COFFEE: "coffee",
  JUICE: "juice",
  FOOD: "food",
};

const Item = connector.sequelize.define(
  "items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(Object.values(itemType)),
      allowNull: false,
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

module.exports = Item;
