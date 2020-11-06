const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order.controller');

router.get('/', orderController.index);
router.get('/detail/', orderController.detail);
module.exports = router;
