const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/:id', productController.singleProduct);

module.exports = router;