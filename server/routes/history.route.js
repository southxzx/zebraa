const express = require('express')
const router = express.Router()

const historyController = require('../controllers/history.controller');

// Add new history
router.post('/add',historyController.addHistory);

// Get all histories by product ID
router.get('/get',historyController.getAllHistories);


module.exports = router;