const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart.controller');

router.get('/', cartController.cart);
router.get('/add/:id', cartController.addCart);
router.post('/edit', cartController.postEditCart);
router.post('/delete', cartController.deleteProduct);
router.post('/postOrder', cartController.postOrder);
router.get('/buy/', cartController.buyCart);

module.exports = router;
