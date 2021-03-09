import userEvent from '@testing-library/user-event'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AndecdoteForm = () => {

  const dispatch = useDispatch()

  const createNew = (event) => {
  event.preventDefault()
  const content = event.target.content.value
  event.target.content.value = ''
  dispatch(addNewAnecdote(content))
}
return (
  <form onSubmit={createNew}>
    <div><input name="content"/></div>
    <button type="submit">create</button>
  </form>
  )
}

export default AndecdoteForm