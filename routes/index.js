const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController.js');

// Wrap our Async functions in this higher order function
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', (req, res, next) => {
  req.flash('error', 'something happened');
  req.flash('info', 'something happened');
  req.flash('warning', 'something happened');
  res.render('index', { title: 'Athena Intelligence' });
});
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'Athena Intelligence' });
});

router.get('/productAdd', productController.addProduct);
router.post('/productAdd', catchErrors(productController.newProduct));

module.exports = router;
