'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsToMany(models.User, {
        through: 'Bookmarks',
      })
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Book',
    },
  )
  return Book
}
