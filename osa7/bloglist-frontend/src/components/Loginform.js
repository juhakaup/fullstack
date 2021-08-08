import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, setUsername, setPassword }) => (
  <div>
    <h2>log in to application</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button className="btn-lg btn-info" variant="primary" type="submit">
        login
      </Button>
    </Form>
  </div>
)
export default LoginForm