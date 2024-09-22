import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { beforeEach, describe, expect } from 'vitest'

describe('<NewBlogForm />', () => {

  const testUser = userEvent.setup()
  const createBlog = vi.fn()
  let container
  beforeEach(() => {
    container = render(<NewBlogForm createBlog={createBlog}/>).container
  })

  test('test that form calls callback function, with right values, when creating a new blog', async () => {
    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await testUser.type(inputs[0], 'Testing title')
    await testUser.type(inputs[1], 'Testing author')
    await testUser.type(inputs[2], 'Testing url')
    await testUser.click(sendButton)

    //console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing title')
    expect(createBlog.mock.calls[0][0].author).toBe('Testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('Testing url')
  })

})