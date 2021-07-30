import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Loginform'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, addNewblog, updateBlog, removeBlog } from './reducers/blogReducer'
import { storeUser, removeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initBlogs(blogs))
    }
    )
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(storeUser(user))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.clear()
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(storeUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} logged in succesfully`, 'notification'))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser)
  }

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    dispatch(addNewblog(newBlog))
    dispatch(setNotification(`a new blog ${blogObject.title} was added`, 'notification'))
  }

  const handleLike = async (blog) => {
    const likes = blog.likes + 1
    const updatedBlog = { ...blog, likes: likes }
    const newBlog = await blogService.update(updatedBlog)
    dispatch(updateBlog(newBlog))
  }

  const deleteBlog = (blog) => {
    console.log(blog)
    if (window.confirm(`Delete ${blog.title}`)) {
      if (blogService.remove(blog.id)) {
        dispatch(removeBlog(blog))
        dispatch(setNotification(`${blog.title} removed`, 'notification'))
      } else {
        dispatch(setNotification('error removing blog', 'error'))
      }
    }
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new blog' closeLabel='cancel' ref={blogFormRef} >
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

  return (
    <div>
      <Notification />
      {user === null
        ? <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        : blogList()
      }
    </div>
  )
}

export default App