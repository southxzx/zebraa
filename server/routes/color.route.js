const express = require('express')
const router = express.Router()

const colorController = require('../controllers/color.controller');

// Load 
router.post('/add',colorController.addColor);


module.exports = router;