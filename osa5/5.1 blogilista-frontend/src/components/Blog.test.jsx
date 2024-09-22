import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'

describe('<Blog />', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Component testing author',
    url: 'www.componenttesting.com',
    likes: 3,
    user: {
      username: 'Component testing user',
      name: 'user\'s name',
      id: 1234
    }
  }
  const user = {
    username: 'Component testing user',
    id: 1234
  }

  const testUser = userEvent.setup()
  const handleLikeing = vi.fn()
  let container
  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} handleLikeing={handleLikeing}/>).container
  })

  test('renders content, but not togglable content', () => {
    const div = container.querySelector('.basicContent')

    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).not.toHaveTextContent('www.componenttesting.com')
    expect(div).not.toHaveTextContent('likes')
    expect(div).not.toHaveTextContent('user\'s name')
  })

  test('renders togglable content after button press', async () => {
    //const user = userEvent.setup()
    const button = screen.getByText('view')
    await testUser.click(button)

    const div = container.querySelector('.togglableContent')
    //screen.debug(div)

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('www.componenttesting.com')
    expect(div).toHaveTextContent('likes')
    expect(div).toHaveTextContent('user\'s name')
  })

  test('pressing like button twice, calls callback function twice', async () => {
    const viewButton = screen.getByText('view')
    await testUser.click(viewButton)

    const likesBefore = blog.likes
    //console.log('likes before: ', likesBefore)

    const likeButton = screen.getByText('like')
    await testUser.click(likeButton)
    await testUser.click(likeButton)

    const likesAfter = handleLikeing.mock.calls[0][0].likes
    //console.log('likes after: ', likesAfter)

    //console.log(handleLikeing.mock.calls)
    expect(handleLikeing.mock.calls).toHaveLength(2)
    expect(likesAfter).toEqual(likesBefore+2)

  })
})