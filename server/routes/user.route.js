const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller');


// Validation
const {

    validLogin,

} = require('../helpers/valid');

// Load controllerr
router.post('/register',controller.registerController);
router.post('/activation',controller.activationController);
router.post('/login',validLogin,controller.loginController);


module.exports = router;