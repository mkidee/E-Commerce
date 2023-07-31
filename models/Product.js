// import models
const { Model, DataTypes } = require('sequelize');
// import db connection
const sequelize = require('../config/connection');

//init Product model (table) by going off of the sequelize model class
class Product extends Model { }

//setting up the Product model:
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
