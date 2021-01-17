const User = require("../models/user.model");
// npm i --save express-jwt lodash node-fetch google-auth-library express-validator jsonwebtoken @sendgrid/mail
const expressJwt = require('express-jwt')   
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


module.exports.authorController = (req,res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    }
    else{
      User.findOne({
        _id : req.query._id
      },((err,user) => {
        if(err) return res.status(400).json({errors : 'Does not match'})
        if(user){
  
          const {role} = user;
  
          return res.json({
            role
          })
        }
      }))
    }
  }
  
  
  module.exports.requireSinIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms : ['HS256']
  })
  
  module.exports.adminMiddleware = (req,res) => {
    console.log(req.user);
  
    User.findOne({
      _id: req.user._id
    }).exec((err,user) => {
      if(err || !user){
        return res.status(400).json({
          errors : 'User not found'
        })
      }
  
      if (user.role !== 'admin') {
        return res.status(400).json({
          error: 'Admin resource. Access denied.'
        });
      }
  
      next();
    })
  }