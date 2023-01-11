'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      Bookmark.belongsTo(models.User, {
        foreignKey: "UserId"
      }), Bookmark.belongsTo(models.Book, {
        foreignKey: "BookId"
      });
    }
  }
  Bookmark.init({
    UserId: { 
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }},
    BookId: { 
      type: DataTypes.INTEGER,
      references: {
        model: "Book",
        key: "id"
      }},
    dateTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};