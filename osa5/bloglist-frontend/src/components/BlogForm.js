import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ( {user, blogs, setBlogs} ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    console.log(blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        // setNewNote('')
    })
  }

  const createNewEntry = () => {
    const entry = {
      title: {title},
      author: {author},
      url: {url}
    }

    blogService.create(entry)
  }

  return (
  <form onSubmit={addBlog}>
    <h2>create new</h2>
    <div>
      title: 
        <input
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author: 
        <input
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url: 
        <input
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
  )
}

export default BlogForm