const sequelize = require('sequelize');
const db = require('../models');

exports.addProduct = (req, res) => {
  res.render('editProduct', { title: 'Add Product' });
};

exports.newProduct = async (req, res) => {
  const product = await db.Product.create(req.body);
  const allProducts = await db.Product.findAll();
  req.flash('success', `Successfully Created ${product.prod_name}`);
  res.redirect(`/product/${product.prod_name}`);

  //   res.json(req.body);
};
exports.productPage = (req, res) => {
  res.send('product page');
};
