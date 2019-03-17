const sequelize = require("sequelize");
const db = require("../models");

exports.addProduct = (req, res) => {
  res.render("editProduct", { title: "Add Product" });
};

exports.newProduct = async (req, res) => {
  await db.Product.create(req.body);
  const allProducts = await db.Product.findAll();
  res.json(allProducts);

  //   res.json(req.body);
};
