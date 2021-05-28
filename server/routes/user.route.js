const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller');
const authController = require('../controllers/author.controller');

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
router.put('/password/forget',forgotPasswordValidator,controller.forgetController);
router.put('/password/reset',resetPasswordValidator,controller.resetController);
router.put('/password/change',controller.changePassword);


// Google and Facebook Login
router.post('/googlelogin', controller.googleController);
router.post('/facebooklogin',controller.facebookController);

// Profile
router.get('/info', controller.getInfo);
router.put('/update',controller.updateInfo);

//
router.get('/author',authController.authorController);
module.exports = router;