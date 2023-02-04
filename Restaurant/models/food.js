'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.hasMany(models.OrderDetail);
    }
  }
  Food.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};