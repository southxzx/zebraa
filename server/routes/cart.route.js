const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart.controller');

// Add new cart
router.post('/add',cartController.addCart);

// Get all carts
router.get('/get', cartController.getAllItemsInCart);



// // Update 
router.put('/update', cartController.updateItemInCart);

// Delete 
router.delete('/delete', cartController.deleteItemInCart);


module.exports = router;