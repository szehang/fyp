const Joi = require('joi');
const mongoose = require('mongoose');

// Defining schema for "User" Collections
const userSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true, 
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String, 
    required: true, 
    minlength: 5,
    maxlength: 1024, // reserve some length for hash salt
  },
})

// Creating "User" model
const User = mongoose.model('User', userSchema)

// The following uses Joi to validate the user
var validateUser = (user) => {
  const schema = Joi.object({
    account: Joi.string().required().min(5).max(50),
    password: Joi.string().required().min(5).max(255), 
  })

  return schema.validate(user)
}

module.exports.User = User
module.exports.validateUser = validateUser