const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()

      // expect to be logged in
      await expect(page.getByText('test test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // fill form with credentials and click login
      await page.getByTestId('username').fill('wrong username')
      await page.getByTestId('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()

      // expect to not be logged in 
      await expect(page.getByText('test test logged in')).not.toBeVisible()
      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // login before each test 
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      // click "create blog"
      await page.getByRole('button', { name: 'create blog' }).click()

      // fill blog info and submit
      await page.getByTestId('title').fill('Testing The Tested Tester Without Testing')
      await page.getByTestId('author').fill('Testing Man')
      await page.getByTestId('url').fill('testingTheUrl.com')
      await page.getByRole('button', { name: 'create' }).click()

      // expect blog to appear
      //const blogaa = await page.getByText('Testing The Tested Tester Without Testing')
      //console.log("blog: ", blogaa.locator('..'))
      await expect(page.getByText('Testing The Tested Tester Without Testing Testing Manview')).toBeVisible()
    })
  })
})