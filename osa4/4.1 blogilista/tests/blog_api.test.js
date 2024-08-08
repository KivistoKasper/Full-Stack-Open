const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let token = 'asd'

describe('signing in...', async () => {
  //token = await helper.makeRootUser()
  await helper.makeRootUser()
  response = await api
              .post('/api/login')
              .send({
                username: 'root',
                password: 'secret'
              })
  token = `Bearer ${response.body.token}`
  //console.log("----TOKEN: ", token)
})


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
})

// ----------------------GET----------------------
describe('api/blogs GET', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are three blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', token)
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
    test('the first blog\'s writer is Michael Chan', async () => {
        const response = await api.get('/api/blogs').set('Authorization', token)
        const authors = response.body.map(e => e.author)
        assert(authors.includes('Michael Chan'))
    })

    test('the returned blogs are identified by id not _id', async () => {
        const response = await api.get('/api/blogs').set('Authorization', token)
        const blogIds = response.body.map(e => e.id)
        const InitialBlogIds = helper.initialBlogs.map(e => e._id)
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
          .set('Authorization', token)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await helper.blogsInDb()
        const titles = response.map(b => b.title)
        assert.strictEqual(response.length, helper.initialBlogs.length + 1)
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
          .set('Authorization', token)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await helper.blogsInDb()
        const addedBlog = response.find(b => b.title === 'Test Title No Like')

        assert.strictEqual(response.length, helper.initialBlogs.length + 1)
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
          .set('Authorization', token)
          .send(newBlog)
          .expect(400)
      
        const response = await helper.blogsInDb()
        assert.strictEqual(response.length, helper.initialBlogs.length)
      })

      test('blog without url is not added', async () => {
        const newBlog = {
            title: "Test Title No URL",
            author: "Test Author No URL"
        }
      
        await api
          .post('/api/blogs')
          .set('Authorization', token)
          .send(newBlog)
          .expect(400)
      
        const response = await helper.blogsInDb()
        assert.strictEqual(response.length, helper.initialBlogs.length)
      })
})

// ----------------------DELETE----------------------
describe('api/blogs/:id DELETE', () => {
  test('a valid blog can be deleted', async () => {
    const blogToDelete = helper.initialBlogs[0]
  
    await api    
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set('Authorization', token)
      .expect(204)

    const response = await helper.blogsInDb()
    const ids = response.map(r => r.id)

    assert(!ids.includes(blogToDelete._id))
    assert.strictEqual(response.length, helper.initialBlogs.length - 1)
  })

  test('an invalid blog id can\'t be deleted', async () => {
    const invalidID = '5a422a851b54a676234d17ff'
    await api    
      .delete(`/api/blogs/${invalidID}`)
      .set('Authorization', token)    
      .expect(404)

    const response = await helper.blogsInDb()
    assert.strictEqual(response.length, helper.initialBlogs.length)
  })

  test('a malformatted blog id can\'t be deleted', async () => {
    const invalidID = '5a422a851b54a676234d17'
    await api    
      .delete(`/api/blogs/${invalidID}`)
      .set('Authorization', token)
      .expect(400)

    const response = await helper.blogsInDb()
    assert.strictEqual(response.length, helper.initialBlogs.length)
  })
})

// ----------------------PUT----------------------
describe('api/blogs/:id PUT', () => {

  test('a valid blog can be updated', async () => {
    const updateID = helper.initialBlogs[0]._id
    const blog = {
      likes: 99
    }
  
    await api    
      .put(`/api/blogs/${updateID}`)
      .set('Authorization', token)
      .send(blog)   
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const updatedBlog = response.find(b => b.id === updateID)

    assert.strictEqual(response.length, helper.initialBlogs.length)
    assert.strictEqual(updatedBlog.id, updateID)
    assert.strictEqual(updatedBlog.likes, 99)
  })

  test('an invalid blog id can\'t be updated', async () => {
    const invalidID = '5a422a851b54a676234d17ff'
    const blog = {
      likes: 88
    }
    await api    
      .put(`/api/blogs/${invalidID}`)
      .set('Authorization', token)
      .send(blog)  
      .expect(404)

    const response = await helper.blogsInDb()
    const ids = response.map(b => b.id)
    assert(!ids.includes(invalidID))
    assert.strictEqual(response.length, helper.initialBlogs.length)
  })

  test('a malformatted blog id can\'t be updated', async () => {
    const invalidID = '5a422a851b54a676234d17'
    const blog = {
      likes: 77
    }
    await api    
      .put(`/api/blogs/${invalidID}`)
      .set('Authorization', token)
      .send(blog)  
      .expect(400)

    const response = await helper.blogsInDb()
    const ids = response.map(b => b.id)
    assert(!ids.includes(invalidID))
    assert.strictEqual(response.length, helper.initialBlogs.length)
  })
})

after(async () => {
    await mongoose.connection.close()
})
