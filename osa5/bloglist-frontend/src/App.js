import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Loginform'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} logged in succesfully`)
      setTimeout(() => {setNotification(null)}, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    
    setNotification(`a new blog ${blogObject.title} was added`)
    setTimeout(() => {setNotification(null)}, 5000) 
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

  return (
    <div>
      <Notification message={notification} />
      <Error message={errorMessage} />
      {user === null
      ? <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      : blogList()
      }
    </div>
  )
}

export default App