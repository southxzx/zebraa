const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order.controller');

// Add new product
router.post('/add',orderController.addOrder);

// Get latest order
router.get('/get',orderController.getLatestOrder);

// // Get all products by Arrival
// router.post('/getAll',productController.getAllProductsByArrival);

// // Update products by ID
// router.put('/update',productController.updateProduct);

// // Delete products by ID
// router.put('/delete',productController.deleteProduct);

module.exports = router;