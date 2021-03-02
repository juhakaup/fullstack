import React from 'react'
import Dropdown from './Dropdown'

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    <Dropdown title={blog.title.concat(" ", blog.author, " ")}>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
      <div>{blog.user.username}</div>
    </Dropdown>
  </div>
)}

export default Blog
