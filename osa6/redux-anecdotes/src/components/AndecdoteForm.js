import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AndecdoteForm = () => {

  const dispatch = useDispatch()

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(newAnecdote))
    dispatch(displayNotification(`you added '${content}'`))
    setTimeout(() => {dispatch(clearNotification())}, 5000)
}
return (
  <form onSubmit={createNew}>
    <div><input name="content"/></div>
    <button type="submit">create</button>
  </form>
  )
}

export default AndecdoteForm