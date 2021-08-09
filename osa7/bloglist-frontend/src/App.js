import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/Loginform'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, addNewblog, updateBlog, removeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch, Redirect, useHistory } from 'react-router-dom'
import { Table, Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const history = useHistory()
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
      dispatch(loginUser(user))
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
      dispatch(loginUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} logged in succesfully`, 'notification'))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const logout = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem('loggedBlogappUser')
    history.push('/login')
    console.log(user)
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
        history.push('/')
      } else {
        dispatch(setNotification('error removing blog', 'error'))
      }
    }
  }

  const padding = {
    padding: 5
  }

  const BlogInfo = () => {
    const blog = blogs.find(blog => blog.id === blogMatch.params.id)
    if (!blog) {
      return null
    }
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button className="btn btn-sm btn-success" id="like-button" onClick={() => handleLike(blog)}>like</button></div>
        <div>added by {blog.user.name}</div>
        <DeleteBlog blog={blog} />
      </div>
    )
  }

  const DeleteBlog = ({ blog }) => {
    if(!blog || !user) return ('')
    if (blog.user.username === user.username) {
      return (
        <button className="btn btn-sm btn-danger" id="delete-button" onClick={() => deleteBlog(blog)}>delete</button>
      )
    } else {
      return ('')
    }
  }

  const BlogList = () => (
    <div>
      <h2>Blogs</h2>
      <hr/>
      <Togglable buttonLabel='new blog' closeLabel='cancel' ref={blogFormRef} >
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <hr/>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link style={padding} to={`/blogs/${blog.id}`}>{ blog.title }</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

  const Users = () => (
    <div>
      <h2>Users</h2>
      <hr/>
      <Table striped>
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
      </Table>
    </div>
  )

  const UserInfo = () => {
    const person = users.find(user => user.id === userMatch.params.id)
    if (!person) {
      return null
    }
    return (
      <div>
        <h2>{person.name}</h2>

        <h3>added blogs</h3>
        <ul>
          {person.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  return (
    <div className="container">
      <div>
        <Notification />
        <Navbar bg="dark" variant="light" expand="sm">
          <Container className="justify-content-start">
            <Navbar.Brand className="text-light">Bloglist app</Navbar.Brand>
            <LinkContainer to="/users">
              <Nav.Link><span className="text-info">users</span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link><span className="text-info">blogs</span></Nav.Link>
            </LinkContainer>
            {user
              ? <span className="text-muted">{user.name} logged in <button className="btn btn-sm btn-secondary" onClick={logout}>logout</button></span>
              : <LinkContainer to="/login"><Nav.Link>login</Nav.Link></LinkContainer>}
          </Container>
        </Navbar>
      </div>
      <Switch>
        <Route path="/users/:id">
          {user ?  <UserInfo /> : <Redirect to="/login" />}
        </Route>
        <Route path="/blogs/:id">
          {user ?  <BlogInfo /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users">
          {user ?  <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user
            ? <Redirect to="/" />
            : <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
          }
        </Route>
        <Route path="/">
          {user ?  <BlogList /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  )
}

export default App