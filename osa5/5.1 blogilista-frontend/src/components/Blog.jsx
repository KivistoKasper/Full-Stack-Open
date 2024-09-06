import { useState } from 'react'
//import '../index.css'


const Blog = ({ blog, handleLikeing }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    const newBlog = blog
    newBlog.likes += 1
    setLikes(newBlog.likes)
    handleLikeing(newBlog)
  }
  
  
  //console.log(blog)
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>  
  )
}

export default Blog