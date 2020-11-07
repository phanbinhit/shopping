const express = require('express');

const router = express.Router();

const product = require('../../controllers/product.admin.controller');

router.get('/', product.getAllProducts);
router.get('/add-product', product.addProduct);
router.post('/add-product', product.postProduct);
router.get('/edit-product/:id', product.editProduct);
router.post('/edit-product/:id', product.postEditProduct)
router.get('/delete-product/:id', product.deleteProduct)

module.exports = router;