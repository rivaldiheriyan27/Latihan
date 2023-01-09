'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Bookmarks = require("../data/bookmark.json");
    Bookmarks.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Bookmarks", Bookmarks, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookmarks", null, {
      restartIdentity: true
    });
  }
};
