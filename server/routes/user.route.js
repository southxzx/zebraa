const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller');

// Load controller
router.post('/add',controller.addUserController);

module.exports = router;