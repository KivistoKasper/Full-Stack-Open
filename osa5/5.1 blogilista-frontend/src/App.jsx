import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="updateInfo">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [authorised, setAuthorised] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const newBlogFormRef = useRef()

  useEffect(() => {
    const fetch = () => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
    if (authorised) fetch() 
  }, [authorised])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)   
      setAuthorised(true) 
    }  
  }, [])

  const handleLogin = async (event) => {    
    event.preventDefault()    
    try {      
      const user = await loginService.login({        
        username, password,      
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)      
      setUser(user)      
      setUsername('')      
      setPassword('')  
      //console.log('USER:', user)
      setAuthorised(true)
    } 
    catch (exception) {      
      setError('wrong username or password') 
      setUsername('')      
      setPassword('')     
      setTimeout(() => {        
        setError(null)      
      }, 5000)    
    }

    console.log('logging in with', username, password)  
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBlog = (blogObject) => {
    blogService.create(blogObject).then(blog => {
      setBlogs(blogs.concat(blog))
      newBlogFormRef.current.toggleVisibility()

      // info message
      setMessage(`new blog: ${blog.title} by ${blog.author} was added`)
      setTimeout(() => {
        setMessage(null)
      },3000)
    })
  }

  // things to show when not logged in
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <Error message={error}/>
          <form onSubmit={handleLogin}>
            <div>
              username
                <input
                  type="text"
                  value={username}
                  name='Username'
                  onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
          </form>
      </div>
    )
  }

  
  // things to show when creating new blog
  const newBlog = () => {
    return (
      <div>
        <Togglable buttonLabel='create blog' ref={newBlogFormRef}>
          <NewBlogForm
            createBlog={handleNewBlog}
          />
        </Togglable>
      </div>
    )
  }

  // things to show when logged in
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <Error message={error}/>

      <p>{user.name} logged in
        <Button handleClick={() => handleLogout()} text='Logout'/>
      </p>

      {newBlog()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App