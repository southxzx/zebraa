const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order.controller');

// Add new product
router.post('/add',orderController.addOrder);

// Get latest order
router.get('/get',orderController.getLatestOrder);

// Get all order
router.get('/getAll', orderController.getAllOrders);

// Update order status
router.put('/update', orderController.updateOrderStatus);

module.exports = router;