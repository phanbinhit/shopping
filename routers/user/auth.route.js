const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');

router.get('/logout', authController.logout);
router.get('/login', authController.login);
router.post('/login', authController.postLogin);
router.get('/register', authController.register);
router.post('/register', authController.postRegister);
module.exports = router;
