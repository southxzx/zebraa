const express = require('express')
const router = express.Router()

const colorController = require('../controllers/color.controller');

// Add new color
router.post('/add',colorController.addColor);

// Get all colors
router.get('/get',colorController.getAllColors)

//Update color by ID
router.put('/update',colorController.updateColor);

// Delete color by ID
router.delete('/delete',colorController.deleteColor);

module.exports = router;