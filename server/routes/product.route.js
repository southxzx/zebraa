const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller');

// Add new product
router.post('/add',productController.addProduct);

// // Get 1 product
router.get('/get',productController.getSingleProduct)

// //Update color by ID
// router.put('/update',colorController.updateColor);

// // Delete color by ID
// router.delete('/delete',colorController.deleteColor);

module.exports = router;