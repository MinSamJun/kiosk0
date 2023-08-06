//  0DB/models/option.js

const DataTypes = require("sequelize").DataTypes;
const connector = require("../dbSequelize");

const Option = connector.sequelize.define(
  "options",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    option_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    extra_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shot_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hot_price: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Option;
