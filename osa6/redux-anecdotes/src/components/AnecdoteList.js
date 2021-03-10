import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'
import { displayNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(incrementVotesOf(anecdote.id))
              dispatch(displayNotification(`you voted '${anecdote.content}'`))
              setTimeout(() => {dispatch(clearNotification())}, 5000)
              }}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList