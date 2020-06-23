const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).send('Bad Request')
    return
  }

  blog.likes = blog.likes || 0

  const savedBlog = await blog.save()
  response.status(200).json(savedBlog)
})

module.exports = blogRouter