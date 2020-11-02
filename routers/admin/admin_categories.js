const express = require('express');

const router = express.Router();

// Category model 
const category = require("../../controllers/category.admin.controller");

router.get('/', category.getAllCategories)
router.get('/add-category', category.addCategory)
router.post('/add-category', category.postCategory)
router.get('/edit-category/:id', category.editCategory)
router.post('/edit-category/:id', category.postEditCategory)
router.get('/delete-category/:id', category.deleteCategory)

module.exports = router;