"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("options", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      option_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      extra_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      shot_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hot_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("options");
  },
};
