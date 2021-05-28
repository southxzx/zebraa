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
    const {name,address,phone, email, password} = req.body;     //client gửi qua axios post
    console.log(name,email,password,address,phone,);

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
        // user.save((err, user) => {
        //   if (err) {
        //     // console.log('Save error', errorHandler(err));
        //     return res.status(401).json({
        //       success: false, err
        //     });
        //   }
        // });
      });

      // Generate token for register
      const token = jwt.sign(
          {
            name,
            address,
            phone,
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

        const { name,address,phone, email, password } = jwt.decode(token);

        console.log(email);
        const user = new User({
          name,
          address,
          phone,
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


module.exports.loginController = (req,res) =>{
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } 
  else{
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {

      if (err || !user) {
        return res.status(400).json({
          errors: 'User with that email does not exist. Please signup'
        });
      }

      // authenticate of Schema
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Email and password do not match'
        });
      }
      
      // generate a token for login, and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d' // token valid in 7d, you can set remember me in front and set it for 30d
        }
      );

      const { _id, name,address,phone, email, role } = user;
  
      return res.json({
        token,
        user: {
          _id,
          name,
          address,
          phone,
          email,
          role
        }
      });
    });
  
  
  }
}

// Google Login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

module.exports.googleController = (req,res) => {
  const { idToken } = req.body;
  // Get token from request

  // Verify token
  client
    .verifyIdToken({idToken, audience: process.env.GOODLE_CLIENT})
    .then(response => {
      console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email ,picture} = response.payload;

      // Check if email verified
      if (email_verified){
        User.findOne({
          email
        }).exec((err,user) => {
          // If exists
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name, role,avatar } = user;
            return res.json({
              token,
              user: { _id, email, name, role, avatar }
            });
          }
          else{
            // If user not exits, We will save in database and genera password for it
            let password = email + process.env.JWT_SECRET;

            user = new User({
              name,
              email,
              password,
              avatar: picture
            });

            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google'
                });
              }

              const token = jwt.sign({ _id: data._id },process.env.JWT_SECRET,{
                 expiresIn: '7d' 
                
              });

              const { _id, email, name, role,avatar } = data;

              return res.json({
                token,
                user: { _id, email, name, role,avatar }
              });
            });

          }

        });
      }
      else{
        return res.status(400).json({
          error: 'Google login failed. Try again'
        });
      }
    })
}


module.exports.facebookController = (req,res) => {
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v9.0/${userID}/?fields=id,name,email,picture.width(96).height(96)&access_token=${accessToken}`; // facebook provide, export like a json
  console.log(url);

  return(
    fetch(url,{
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {

        console.log(response);

        const { email, name, picture } = response;
        
        User.findOne({
          email
        }).exec((err,user) => {
          if (user){
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name, role, avatar } = user;

            return res.json({
              token,
              user: { _id, email, name, role, avatar }
            });
          }
          else{
            let password = email + process.env.JWT_SECRET;

            user = new User({
              name,
              email,
              password,
              avatar : picture.data.url
            });

            user.save((err, data) => {
              if (err) {
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with facebook'
                });
              }

              const token = jwt.sign({ _id: data._id },process.env.JWT_SECRET,{
                expiresIn: '7d' 
               
              });

              const { _id, email, name, role, avatar } = data;

              return res.json({
                token,
                user: { _id, email, name, role, avatar }
              });

            });

          }
        })
      })
      .catch(error => {
        res.json({
          error: 'Facebook login failed. Try later'
        });
      })
  );
}




module.exports.forgetController = (req,res) => {

  const {email} = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } 
  else{
    // Find if user exists
    User.findOne({
      email
    }).exec((err,user) => {

      if(err || !user){
        return res.status(400).json({
          errors: 'User with that email does not exist'
        });
      }

      // If exists 
      // Token for reset password
      const token = jwt.sign(
        {
          _id : user._id
        },
        process.env.JWT_RESET_PASSWORD,
        
        {
          expiresIn : "10m"
        }
      );

      // Send mail with this token
      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Password Reset link`,
        html: `
                  <h1>Please use the following link to reset your password</h1>
                  <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                  <hr />
                  <p>This email may contain sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
              `
      };

      return user.updateOne(
        {
          resetPasswordLink: token    // Add resetPasswordLink for user
        },
        (err, success) => {
          if (err) {
            console.log('RESET PASSWORD LINK ERROR', err);
            return res.status(400).json({
              errors:
                'Database connection error on user password forgot request'
            });
          } else {
            sgMail
              .send(emailData)
              .then(sent => {
                // console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                  message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                });
              })
              .catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                  message: err.message
                });
              });
          }
        }
      );
      
    });
  }
}


module.exports.resetController = (req,res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  }
  else{
    if(resetPasswordLink){
      jwt.verify(resetPasswordLink,process.env.JWT_RESET_PASSWORD, (err,decoded) => {
        
        if (err) {
          return res.status(400).json({
            errors: 'Expired link. Try again'
          });
        }

        User.findOne({
          resetPasswordLink
        }).exec((err,user) => {

          if (err || !user) {
            return res.status(400).json({
              errors: 'Something went wrong. Try later'
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
          };

          user = _.extend(user, updatedFields); // Copies every property of the source objects into the first object.
          // var target = {a:3, c: 3};
          // _.extend(target, {a: 1, b: 2}); // target is now {a: 1, b: 2, c: 3}

          user.save((err, result) => {  // Updates an existing document or inserts a new document, depending on its document parameter.
            if (err) {
              return res.status(400).json({
                errors: 'Error resetting user password'
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`
            });
          });

        });

      });
    }
  }
}


module.exports.changePassword = (req,res) => {
  const {_id, oldPassword , newPassword} = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  }
  else{
    User.findOne({
      _id
    }).exec((err,user) => {

      if (err || !user) {
        return res.status(400).json({
          errors: 'Something went wrong. Try later'
        });
      }

      if(user.authenticate(oldPassword)){

        const updatedField = {
          password : newPassword
        }

        user = _.extend(user, updatedField);

        user.save((err, result) => {  // Updates an existing document or inserts a new document, depending on its document parameter.
          if (err) {
            return res.status(400).json({
              errors: 'Error resetting user password'
            });
          }
          res.json({
            message: `Great! Now you can login with your new password`
          });
        });

      }else{
        res.status(400).json({
          errors : 'Does not match password'
        })
      }


    })
  }
}

module.exports.getInfo = (req,res) =>{
  //const email = localStorage.getItem("user").email;

  const {email} = req.query;

  User.findOne({ email: email}, (err, data) => {
    if (err) return res.send(err);
    res.status(200).send({ data });
  });
}

module.exports.updateInfo = (req,res) => {
  //const {name, address, phone} = req.body;
  User.findByIdAndUpdate(
    {_id : req.query._id},
    { $set : req.body},
    (err,data) => {
        if (err) return res.send(err);
        res.status(200).send({
          message: `Update Successful`
        });
    }
  )
}

////