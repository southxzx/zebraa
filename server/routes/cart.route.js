const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart.controller');

// Add new cart
router.post('/add',cartController.addCart);

// Get all carts
router.get('/get', cartController.getAllItemsInCart);

// // Update category by ID
// router.put('/update', categoryController.updateCategory);

// Delete category
// router.delete('/delete', categoryController.deleteCategory);


module.exports = router;