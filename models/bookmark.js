'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    
    static associate(models) {
      Bookmark.belongsTo(models.Customer, {
        foreignKey: "UserId"
      }), Bookmark.belongsTo(models.Product, {
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