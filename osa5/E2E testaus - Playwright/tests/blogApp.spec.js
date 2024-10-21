const { test, expect, beforeEach, describe } = require('@playwright/test')
import testHelper from './helper'

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test test',
        username: 'test',
        password: 'test'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    const loginButton = await page.getByRole('button', { name: 'login' })
    await expect(locator).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // fill form with credentials and click login
      await testHelper.loginWith(page, 'test', 'test')

      // expect to be logged in
      await expect(page.getByText('test test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // fill form with credentials and click login
      await testHelper.loginWith(page, 'test', 'wrong username')

      // expect to not be logged in 
      await expect(page.getByText('test test logged in')).not.toBeVisible()
      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // login before each test 
      await testHelper.loginWith(page, 'test', 'test')
    })
  
    test('a new blog can be created', async ({ page }) => {
      // create a new blog 
      await testHelper.createBlog(page, 'Testing The Tested Tester Without Testing', 'Testing Man', 'testingTheUrl.com')
      //const blogaa = await page.getByText('Testing The Tested Tester Without Testing')
      //console.log("blog: ", blogaa.locator('..'))
      // expect blog to appear
      await expect(page.getByText('Testing The Tested Tester Without Testing Testing Manview')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      // create a new blog 
      await testHelper.createBlog(page, 'Testing The Tested Tester Without Testing', 'Testing Man', 'testingTheUrl.com')
      // expect blog to appear
      await expect(page.getByText('Testing The Tested Tester Without Testing Testing Manview')).toBeVisible()
      // click "view" and click "like"
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      // expect like to appear
      await expect(page.getByText('Testing The Tested Tester Without Testing Testing Manhide')).toBeVisible()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})