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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    likes: body.likes,
  }

  const updatedNote = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedNote)
})

module.exports = blogRouter