const sequelize = require('sequelize');

exports.addProduct = (req, res) => {
  res.render('editProduct', { title: 'Add Product' });
};
