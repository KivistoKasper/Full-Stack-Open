import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe } from 'vitest'

describe('<NewBlogForm />', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Component testing author',
    user: {
      username: 'Component testing user'
    }
  }
  const user = {
    username: 'Component testing user'
  }

  let container
  beforeEach(() => {
    container = render(<Blog blog={blog} user={user}/>).container
  })

  test('renders content', () => {
    const div = container.querySelector('.basicContent')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    //screen.debug(div)
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })
})