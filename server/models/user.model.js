const mongoose = require("mongoose");
const crypto = require("crypto");
cartSchema = require("../models/cart.model").schema;
historySchema = require("../models/history.model").schema;

const Schema = mongoose.Schema;
// User schema
const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      hashed_password: {
        type: String,
        required: true,
      },
      salt: String,
      role: {
        type: String,
        default: "subscriber",
        //I have more type (subscriber, admin, ...)
      },
      resetPasswordLink: {
        data: String,
        default: "",
      },
      cart:[cartSchema],
      history:[historySchema],
      phone:{
        type: String
      },
      address:{
        type: String
      },
      avatar:{
        type: String
      }
    },
    { timestamps: true }    // can create: createdAt and updatedAt
);

// Virtual Password
userSchema                // When transfer password in : const user = new Data({...,password})
  .virtual("password")
  .set(function (password) {
    // set password note you must use normal func not arrow func
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods : automatic call when set virtual
userSchema.methods = {

    // Encrypt Password
    encryptPassword: function (password) {
      if (!password) return "";
      try {
        return crypto
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex");
      } catch (err) {
        return "";
      }
    },
  
    //Compare password between plain get from user and hashed
    authenticate: function (plainText) {
      return this.encryptPassword(plainText) === this.hashed_password;
    },
  
    // Generate Salt
    makeSalt: function () {
      return Math.round(new Date().valueOf() * Math.random()) + "";
    },
  };
  

module.exports = mongoose.model('User', userSchema);