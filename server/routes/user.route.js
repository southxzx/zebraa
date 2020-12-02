const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller');
const colorController = require('../controllers/color.controller');

// Load controllerr
router.post('/register',controller.registerController);
router.post('/activation',controller.activationController);


module.exports = router;