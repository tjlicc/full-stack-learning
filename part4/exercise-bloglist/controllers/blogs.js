const jwt = require('jsonwebtoken')
const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!blog.title || !blog.url) {
    response.status(400).send('Bad Request')
    return
  }

  blog.likes = blog.likes || 0
  blog.user = decodedToken.id
  const savedBlog = await blog.save()
  const user = await User.findById(blog.user)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const userId = decodedToken.id

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== userId) {
    return response.status(401).send({ error: 'token missing or invalid' })
  }

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