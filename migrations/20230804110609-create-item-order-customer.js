"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("item_order_customers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      order_customers_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      extra_TF: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      shot_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      hot_TF: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("item_order_customers");
  },
};
