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
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('test')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('test test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('wrong username')
      await page.getByTestId('password').fill('test')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('test test logged in')).not.toBeVisible()
      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })

})