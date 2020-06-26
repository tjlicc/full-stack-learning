const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs')
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body
  const password = body.password
  if (!password || password.trim().length === 0) {
    return res.status(400).send({ error: 'password is required!' })
  }
  if (password.length < 3) {
    return res.status(400).send({ error: 'password\'s length must be greater than 3!' })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = usersRouter