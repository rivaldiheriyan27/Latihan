'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Tables = require("../data/table.json");
    Tables.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Tables", Tables, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tables", null, {
      restartIdentity: true
    });
  }
};
