import React from 'react'
import { connect } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AndecdoteForm = (props) => {

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.addNewAnecdote(content)
    props.setNotification(`you added '${content}'`, 10)
}
return (
  <form onSubmit={createNew}>
    <div><input name="content"/></div>
    <button type="submit">create</button>
  </form>
  )
}

export default connect(
  null,
  { addNewAnecdote,
    setNotification
  }
)(AndecdoteForm)