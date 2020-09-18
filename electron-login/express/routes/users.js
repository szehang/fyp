const { modelNames } = require('mongoose')

const router = require('express').Router()
const { User, validateUser } = require('../models/user')
const bcrypt = require('bcrypt')

// POST /api/users
router.post('/', async (req, res) => {
  // Joi validation
  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Check if user exists
  let user = await User.findOne({ account: req.body.account })
  if (user) return res.status(400).send(`${req.body.account} already existed.`)

  // Creating new user
  user = new User(req.body)

  // Hash incoming password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()

  res.send(user)
})


module.exports = router