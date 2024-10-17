import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    createBlog(newBlog)

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid='title'
            type="text"
            value={newTitle}
            name='Title'
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid='author'
            type="text"
            value={newAuthor}
            name='Author'
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid='url'
            type="text"
            value={newUrl}
            name='Url'
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm