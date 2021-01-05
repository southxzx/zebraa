// Validations Helpers
const {
    check
} = require('express-validator');

//Register
exports.validRegister = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 3,
        max: 32
    }).withMessage('name must be between 3 to 32 characters'),
    check('email', 'Email is required').notEmpty()
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number'),
    check('password','Password must contain At least One UpperCase, LowerCase, Special character').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/, "i"),
    check('phone','Phone must be number').isInt(),
    check('phone','Phone must contain at 10 number').isLength({min:10,max:10})
];

// Login
exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
];

// Forget password
exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

// Reset password
exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long')
];