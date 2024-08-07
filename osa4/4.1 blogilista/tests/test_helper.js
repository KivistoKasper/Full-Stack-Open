const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    } 
  ]

const nonExistingId = async () => {
    const blog = new Blog({
        title: "test helper blog",
        author: "test helper blog",
        url: "testhelperblog.com",
        likes: 7
      })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const makeRootUser = async () => {
  await User.deleteMany({})

  const root = {
    username: 'root',
    password: 'secret'
  }

  const passwordHash = await bcrypt.hash(root.password, 10)
  const user = new User({ username: root.username, passwordHash })
  await user.save()
}

const rootSignIn = async (api) => {
  const response = await api
              .post('/api/login')
              .send({
                username: 'root',
                password: 'secret'
              })
  return `Bearer ${response.body.token}`
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  makeRootUser,
  rootSignIn
}