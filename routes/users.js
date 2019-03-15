const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const userController = require("../controllers/userController");
require("../config/passport")(passport);
const { Product, User } = require("../models");

/* GET index route. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "user routes" });
});

// USER LOGIN GET AND POST
router.get("/signin", userController.loginForm);
router.get("/signup", userController.signupForm);
// POST SIGNUP
router.post("/signup", userController.validateRegister);
// POST SIGNIN
router.post("/signin", userController.welcomeBack);

// USER POST and EDIT PRODUCTS
router.get(
  "/product",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      Product.findAll()
        .then(products => res.status(200).send(products))
        .catch(error => {
          res.status(400).send(error);
        });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.post(
  "/product",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      Product.create({
        prod_name: req.body.prod_name,
        prod_desc: req.body.prod_desc,
        prod_price: req.body.prod_price,
      })
        .then(product => res.status(201).send(product))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

getToken = function(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};
module.exports = router;
