'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Foods = require("../data/food.json");
    Foods.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Food", Foods, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", null, {
      restartIdentity: true
    });
  }
};
