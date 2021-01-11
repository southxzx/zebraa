const express = require('express')
const router = express.Router()
const upload = require("../utils/multer");

const colorProductController = require('../controllers/color_product');

// Add new product
router.post('/add',upload.array('images'),colorProductController.addColorProduct);

router.get('/get',colorProductController.getAllColorProduct);
// // Get 1 product
// router.get('/get',productController.getSingleProduct);

// // Get all products by Arrival
// router.get('/getAll',productController.getAllProductsByArrival);

// // Update products by ID
// router.put('/update',productController.updateProduct);

// // Delete products by ID
// router.put('/delete',productController.deleteProduct);

module.exports = router;