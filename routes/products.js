const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController.js');

// Wrap our Async functions in this higher order function
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/product:name', productController.productPage);
