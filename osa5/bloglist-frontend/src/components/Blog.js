import React from 'react'
import Dropdown from './Dropdown'

const Blog = ({ blog, handleLike, user, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const DeleteBlog = (id) => {
  if (blog.user.username === user.username) {
    return (
      <button onClick={() => deleteBlog(blog)}>delete</button>
      )
  } else {
    return ('')
  }
}
  return (
  <div style={blogStyle}>
    <Dropdown title={blog.title.concat(" ", blog.author, " ")}>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
      <div>{blog.user.username}</div>
      <div><DeleteBlog /></div>
    </Dropdown>
  </div>
)}

export default Blog
