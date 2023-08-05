"use strict";

module.exports = {
  // 모델의 업데이트를 적용하는 마이그레이션
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("order_customers", "state", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.changeColumn("order_customers", "fullPrice", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  // 이전으로 되돌리기
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("order_customers", "state", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });

    await queryInterface.changeColumn("order_customers", "fullPrice", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
