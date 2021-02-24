const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUsed = await user.save()

  response.json(savedUsed)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  const mod = users.map(function(user) {
    return { name: user.name,
      username: user.username,
      id: user.id }
  })
  response.json(mod)
})

module.exports = usersRouter