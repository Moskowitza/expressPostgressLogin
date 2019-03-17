const express = require('express');
const productController = require('../controllers/productController.js');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Athena Intelligence' });
});
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'Athena Intelligence' });
});

router.get('/productAdd', productController.addProduct);
router.post('/productAdd', productController.newProduct);

module.exports = router;
