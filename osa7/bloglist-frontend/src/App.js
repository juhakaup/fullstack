import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/Loginform'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, addNewblog, updateBlog, removeBlog } from './reducers/blogReducer'
import { storeUser, removeUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    }
    )
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initBlogs(blogs))
    }
    )
  }, [dispatch])

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
    if (window.confirm(`Delete ${blog.title}`)) {
      if (blogService.remove(blog.id)) {
        dispatch(removeBlog(blog))
        dispatch(setNotification(`${blog.title} removed`, 'notification'))
      } else {
        dispatch(setNotification('error removing blog', 'error'))
      }
    }
  }

  const BlogList = () => (
    <div>
      <Togglable buttonLabel='new blog' closeLabel='cancel' ref={blogFormRef} >
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

  const padding = {
    padding: 5
  }

  const UserInfo = () => {
    const person = users.find(user => user.id === match.params.id)
    if (!person) {
      return null
    }
    return (
      <div>
        <h2>{person.name}</h2>

        <h3>added blogs</h3>
        <ul>
          {person.blogs.map(blog =>
            <li key={blog.title}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }

  const Users = () => (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link style={padding} to={`/users/${user.id}`}>{ user.name }</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

  const match = useRouteMatch('/users/:id')

  if (user === null) {
    return (
      <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
    )
  }
  return (
    <div>
      <div>
        <Notification />
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      </div>
      <Switch>
        <Route path="/users/:id">
          <UserInfo />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App