const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const InitialBlogs = [
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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(InitialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(InitialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(InitialBlogs[2])
    await blogObject.save()
})

describe('api/blogs GET', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are three blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, InitialBlogs.length)
    })
    
    test('the first blog\'s writer is Michael Chan', async () => {
        const response = await api.get('/api/blogs')
        const authors = response.body.map(e => e.author)
        assert(authors.includes('Michael Chan'))
    })

    test('the returned blogs are identified by id not _id', async () => {
        const response = await api.get('/api/blogs')
        const blogIds = response.body.map(e => e.id)
        const InitialBlogIds = InitialBlogs.map(e => e._id)
        assert.deepStrictEqual(blogIds, InitialBlogIds)
    })
})

describe.only('api/blogs POST', () => {
    test.only('a valid blog can be added', async () => {
        const newBlog = {
            title: "Test Title",
            author: "Test Author",
            url: "https://testurl.com",
            likes: 6
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')
        const titles = response.body.map(b => b.title)
        assert.strictEqual(response.body.length, InitialBlogs.length + 1)
        assert(titles.includes('Test Title'))
      })

      test.only('blog can be added without like amount', async () => {
        const newBlog = {
            title: "Test Title No Like",
            author: "Test Author No Like",
            url: "https://testurl.com"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')
        const addedBlog = response.body.find(b => b.title === 'Test Title No Like')

        assert.strictEqual(response.body.length, InitialBlogs.length + 1)
        assert.strictEqual(addedBlog.title, 'Test Title No Like')
        assert.strictEqual(addedBlog.likes, 0)
      })

      test.only('blog without title is not added', async () => {
        const newBlog = {
            author: "Test Author No Title",
            url: "https://testurlnotitle.com"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, InitialBlogs.length)
      })

      test.only('blog without url is not added', async () => {
        const newBlog = {
            title: "Test Title No URL",
            author: "Test Author No URL"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, InitialBlogs.length)
      })

})

after(async () => {
    await mongoose.connection.close()
})
