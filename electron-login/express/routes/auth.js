const router = require('express').Router()
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const dbDebugger = require('debug')('fyp:db')

// POST /api/users
router.post('/', async (req, res) => {
  // Check if user exists
  let user = await User.findOne({ account: req.body.account })
  if (!user) return res.status(400).send(`Invalid account or password`)

  const isValidPassaword = await bcrypt.compare(req.body.password, user.password)
  if (!isValidPassaword) return res.status(400).send(`Invalid account or password`)

  res.send(req.body.account)
})

module.exports = router