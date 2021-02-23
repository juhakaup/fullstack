const blogsRouter = require('express').Router()
const Blog = require('./../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const likes = request.body.likes===undefined ? 0 : request.body.likes
  const blog = new Blog({ likes, ...request.body })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    }).catch(error => next(error))
})

module.exports = blogsRouter