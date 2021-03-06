const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController.js');

// Wrap our Async functions in this higher order function
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(productController.getProducts));
router.get('/:id/edit', catchErrors(productController.editProduct));
module.exports = router;
