const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category.controller');

// Add new category
router.post('/add',categoryController.addCategory);

// Get all categories
router.get('/get', categoryController.getAllCategories);

// Update category by ID
router.put('/update', categoryController.updateCategory);

// Delete category
router.delete('/delete', categoryController.deleteCategory);


module.exports = router;