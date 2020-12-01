const express = require('express')
const router = express.Router()

const sizeController = require('../controllers/size.controller');

// Add new size
router.post('/add',sizeController.addSize);

// Get all sizes
router.get('/get',sizeController.getAllSizes)

//Update size by ID
router.put('/update',sizeController.updateSize);

//Delete size by ID
router.delete('/delete',sizeController.deleteSize);

module.exports = router;