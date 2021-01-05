const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller');


// Validation
const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid');

// Load controllerr
router.post('/register',validRegister,controller.registerController);
router.post('/activation',controller.activationController);
router.post('/login',validLogin,controller.loginController);

// Google and Facebook Login
router.post('/googlelogin', controller.googleController);

module.exports = router;