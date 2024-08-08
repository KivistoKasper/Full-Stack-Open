const blogsRouter = require('express').Router()
const { request } = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(request.user.id)
    //console.log('user', user)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deleteBlogId = request.params.id
  const user = request.user

  const blog = await Blog.findById(deleteBlogId)
  if (!blog) {
    response.status(404).end()
  }

  if (!blog.user) {
    // this is if there happens to be blog in database that has no user who added it. 
    // if this happens then the blog is removed 
    const deletedBlog = await Blog.findByIdAndDelete(deleteBlogId)
    response.status(204).end()
  }
  else if ( blog.user.toString() === user.id.toString() ) {
    const deletedBlog = await Blog.findByIdAndDelete(deleteBlogId)
    response.status(204).end()
  } 
  else {
    response.status(403).json({error: 'no access rights to the content'})
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const updateBlog = {
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateBlog,
    {new: true, runValidators: true, context: 'query'})

  if (!updatedBlog) {
    response.status(404).end()
  }
  else {
    response.json(updatedBlog)
  }
  
})

module.exports = blogsRouter