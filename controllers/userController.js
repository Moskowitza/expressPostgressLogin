const sequelize = require("sequelize");

exports.loginForm = (req, res) => {
  res.render("signin", { title: "Login" });
};
