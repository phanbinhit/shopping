const express = require('express');

const router = express.Router();

const product = require('../../controllers/product.admin.controller');

router.get('/', product.getAllProducts);
router.get('/add-product', product.addProduct);

module.exports = router;