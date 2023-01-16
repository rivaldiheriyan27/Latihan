'use strict'
const { Model } = require('sequelize')
const { hashPassword } = require('../helpers/hashPassword')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Book, {
        through: 'Bookmarks',
      })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Email cannot be null` },
          notEmpty: { msg: `Email cannot be empty` },
          isEmail: { msg: `Must be an email` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Password cannot be null` },
          notEmpty: { msg: `Password cannot be empty` },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      deadLine: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password)
    instance.role = 'User'
  })
  return User
}
