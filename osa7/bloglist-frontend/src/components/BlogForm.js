import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createNewBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>create new blog entry</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button className="btn btn-success" variant="primary" type="submit">
          create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm