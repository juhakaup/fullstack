import userEvent from '@testing-library/user-event'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AndecdoteForm = () => {

  const dispatch = useDispatch()
  
  const createNew = (event) => {
  event.preventDefault()
  dispatch(addNewAnecdote(event.target.content.value))
}
return (
  <form onSubmit={createNew}>
    <div><input name="content"/></div>
    <button type="submit">create</button>
  </form>
  )
}

export default AndecdoteForm