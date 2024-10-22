const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  // click "create blog"
  await page.getByRole('button', { name: 'create blog' }).click()

  // fill blog info and submit
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}view`).waitFor()
}

const likeBlog = async (page, blogTitle, likes) => {
  const blog = await page.locator('.basicContent').getByText(blogTitle).locator('..')
  // click "view"
  await blog.getByRole('button', { name: 'view' }).click()
  // click "like" for specific amount
  for (let i = 0; i < likes; i++){
    await blog.getByRole('button', { name: 'like' }).click()
    // let DOM update
    await page.waitForTimeout(200);
  } 
}

export default { loginWith, createBlog, likeBlog }