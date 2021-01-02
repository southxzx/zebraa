const express = require('express')
const router = express.Router()

const searchController = require('../controllers/search.controller')

// search
router.get('/get',searchController.searchProduct);

module.exports = router;