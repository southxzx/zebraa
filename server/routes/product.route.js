const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller');

// Add new product
router.post('/add',productController.addProduct);

// // Get 1 product
router.get('/get',productController.getSingleProduct);

// Get all products by Arrival
router.get('/getAll',productController.getAllProductsByArrival);

// Update products by ID
router.put('/update',productController.updateProduct);

// Delete products by ID
router.put('/delete',productController.deleteProduct);

module.exports = router;