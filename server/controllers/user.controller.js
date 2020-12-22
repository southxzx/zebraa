const User = require("../models/user.model");
// npm i --save express-jwt lodash node-fetch google-auth-library express-validator jsonwebtoken @sendgrid/mail
const expressJwt = require('express-jwt')   
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Custom error handler to get useful error from database error
//const { errorHandler } = require('../helpers/dbErrorHandling');
// Use send email sendgrid
const sgMail = require('@sendgrid/mail');
const { response } = require('express');
sgMail.setApiKey(process.env.MAIL_KEY);


module.exports.registerController = (req,res) =>{
    const {name, email, password} = req.body;     //client gửi qua axios post
    console.log(name,email,password);

    const errors = validationResult(req);


    // Validation to req.body we will create custom validation
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      User.findOne({
        email
      }).exec((err, user) => {
        // If user exits in database
        if (user) {
          return res.status(400).json({     // return lỗi
            errors: 'Email is taken'

          });
        }
        // save vào mongodb thì sẽ thêm 1 collection có tên là :(tên Schema + s), như User thì -> users ; và sẽ thêm trg _id cho collection đó
        user.save((err, user) => {
          if (err) {
            // console.log('Save error', errorHandler(err));
            return res.status(401).json({
              success: false, err
            });
          }
        });
      });

      // Generate token for register
      const token = jwt.sign(
          {
            name,
            email,
            password
          },
          process.env.JWT_ACCOUNT_ACTIVATION,
          {
            expiresIn: '15m'
          }
      );

      // Email data sending
      const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Account activation link',
          html: `
                    <h1>Please use the following to activate your account</h1>
                    <h3>Hello ${name}, click your link to activate account</h3>
                    <p>${process.env.CLIENT_URL}/users/activate/${token}</p>  
                    <hr />
                    <p>This email may containe sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
      };            // link to activation /users/activate/token

      sgMail.send(emailData).then(sent => {
          return res.json({
              message: `Email has been sent to ${email}`
          });
      }).catch(err => {
          return res.status(400).json({
              success: false,
              errors: err,
              emailKey: process.env.MAIL_KEY
          });
      });

      
  }

}

module.exports.activationController = (req,res) => {
  const { token } = req.body;     //client gửi qua axios post

  if(token){
    // Verify the token is valid or not , or expired
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      
      if (err) {
        console.log('Activation error');
        return res.status(401).json({
          errors: 'Expired link. Signup again'
        });
      }
      
      else {
        // If valid save to database
        // Get name, email, password from token

        const { name, email, password } = jwt.decode(token);

        console.log(email);
        const user = new User({
          name,
          email,
          password
        });

        // save vào mongodb thì sẽ thêm 1 collection có tên là :(tên Schema + s), như User thì -> users ; và sẽ thêm trg _id cho collection đó 
        user.save((err, user) => {
          if (err) {
            
            return res.status(401).json({
              errors: err
            });
          } else {
            return res.json({
              success: true,
              message: 'Signup success',
              user
            });
          }
        });
      }

    });
  }

  else {
    return res.json({
      message: 'error happening please try again'
    });
  }

};

