const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test helper username',
      name: 'test helper name',
      password: 'test helper password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'PassWord',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'er',
      name: 'er',
      password: 'PassWord',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('is shorter than the minimum allowed length'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with no username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'er',
      password: 'PassWord',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('`username` is required'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'passwordtest',
        name: 'passwordtest',
        password: 'pa',
      }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('`Password` is too short'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with no password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'passwordtest',
        name: 'passwordtest'
      }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('`Password` is required'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
    await mongoose.connection.close()
})