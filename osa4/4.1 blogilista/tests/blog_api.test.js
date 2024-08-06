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

// ----------------------GET----------------------
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

// ----------------------POST----------------------
describe('api/blogs POST', () => {
    test('a valid blog can be added', async () => {
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

      test('blog can be added without like amount', async () => {
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

      test('blog without title is not added', async () => {
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

      test('blog without url is not added', async () => {
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

// ----------------------DELETE----------------------
describe.only('api/blogs/:id DELETE', () => {
  test.only('a valid blog can be deleted', async () => {
    const blogToDelete = InitialBlogs[0]
  
    await api    
      .delete(`/api/blogs/${blogToDelete._id}`)    
      .expect(204)

    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)

    assert(!ids.includes(blogToDelete._id))
    assert.strictEqual(response.body.length, InitialBlogs.length - 1)
  })

  test.only('an invalid blog id can\'t be deleted', async () => {
    const invalidID = '5a422a851b54a676234d17ff'
    await api    
      .delete(`/api/blogs/${invalidID}`)    
      .expect(204)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, InitialBlogs.length)
  })

  test.only('a malformatted blog id can\'t be deleted', async () => {
    const invalidID = '5a422a851b54a676234d17'
    await api    
      .delete(`/api/blogs/${invalidID}`)    
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, InitialBlogs.length)
  })
})

// ----------------------PUT----------------------
describe.only('api/blogs/:id PUT', () => {

  test.only('a valid blog can be updated', async () => {
    const updateID = InitialBlogs[0]._id
    const blog = {
      likes: 99
    }
  
    await api    
      .put(`/api/blogs/${updateID}`) 
      .send(blog)   
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const updatedBlog = response.body.find(b => b.id === updateID)

    assert.strictEqual(response.body.length, InitialBlogs.length)
    assert.strictEqual(updatedBlog.id, updateID)
    assert.strictEqual(updatedBlog.likes, 99)
  })

  test.only('an invalid blog id can\'t be updated', async () => {
    const invalidID = '5a422a851b54a676234d17ff'
    const blog = {
      likes: 88
    }
    await api    
      .put(`/api/blogs/${invalidID}`)
      .send(blog)  
      .expect(404)

    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)
    assert(!ids.includes(invalidID))
    assert.strictEqual(response.body.length, InitialBlogs.length)
  })

  test.only('a malformatted blog id can\'t be updated', async () => {
    const invalidID = '5a422a851b54a676234d17'
    const blog = {
      likes: 77
    }
    await api    
      .put(`/api/blogs/${invalidID}`)  
      .send(blog)  
      .expect(400)

    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)
    assert(!ids.includes(invalidID))
    assert.strictEqual(response.body.length, InitialBlogs.length)
  })
})

after(async () => {
    await mongoose.connection.close()
})