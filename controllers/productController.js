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

exports.getProducts = async (req, res) => {
  // query database for all products
  const allProducts = await db.Product.findAll({
    raw: true,
    // Other parameters
  });
  console.log(allProducts);
  res.render('products', { title: 'products', allProducts });
};
exports.editProduct = async (req, res) => {
  // find the product by ID
  const { id } = req.params;
  const editProduct = await db.Product.findOne({
    where: { id },
    raw: true,
  });
  // find the User, make sure they are owner
  // send edit form with the product info
  res.render('editProduct', {
    title: `Edit ${editProduct.prod_name}`,
    editProduct,
  });
};
