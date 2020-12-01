const express = require('express')
const router = express.Router()

const brandController = require('../controllers/brand.controller');

// Add new brand
router.post('/add',brandController.addBrand);

// Get all brand
router.get('/get',brandController.getAllBrands);

//Update brand by ID
router.put('/update/',brandController.updateBrand);

// Delete brand by ID
router.delete('/delete',brandController.deleteBrand);


module.exports = router;