const express = require('express')
const router = express.Router()

const brandController = require('../controllers/brand.controller');

// Add new brand
router.post('/add',brandController.addBrand);

// Get all brand
router.get('/get',brandController.getAllBrands);

//Update brand
router.put('/update/',brandController.updateBrand);

module.exports = router;