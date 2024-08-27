import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
  const [authorised, setAuthorised] = useState(false);

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

    } catch (exception) {      
      setErrorMessage('wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    }

    
    console.log('logging in with', username, password)  
  }

  const handelLogout = event => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
  
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <Button handleClick={() => handelLogout()} text='Log out'/>
      {console.log(blogs)}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App