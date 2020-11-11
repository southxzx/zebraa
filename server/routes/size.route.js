const express = require('express')
const router = express.Router()

const sizeController = require('../controllers/size.controller');

// Add new size
router.post('/add',sizeController.addSize);

// Get all sizes
router.get('/get',sizeController.getAllSizes)

module.exports = router;