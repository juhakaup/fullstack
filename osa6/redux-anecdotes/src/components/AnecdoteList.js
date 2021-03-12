import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter(function(a) {
      return a.content.toLowerCase().includes(filter.toLowerCase())
    })
    filteredAnecdotes.sort(function(a,b) {return b.votes - a.votes})
    return filteredAnecdotes
  })

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
              dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
              }}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList