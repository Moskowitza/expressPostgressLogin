const sequelize = require('sequelize');
const db = require('../models');

exports.addProduct = (req, res) => {
  res.render('editProduct', { title: 'Add Product' });
};

exports.newProduct = (req, res) => {
  db.Product.create(req.body).then(postedProduct => res.json(postedProduct));
  //   res.json(req.body);
};
