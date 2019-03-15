'use strict';

const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define(
    'Product',
    {
      prod_name: DataTypes.STRING,
      prod_desc: DataTypes.STRING,
      prod_price: DataTypes.FLOAT,
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Product;
};
