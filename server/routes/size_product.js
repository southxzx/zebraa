const express = require('express')
const router = express.Router()

const sizeProductController = require('../controllers/size_product');

// Add new size product
router.post('/add',sizeProductController.addSizeProduct);

router.put('/update',sizeProductController.updateSizeProduct);

module.exports = router;