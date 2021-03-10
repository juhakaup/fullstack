import React from 'react'
import AndecdoteForm from './components/AndecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <h2>create new</h2>
      <AndecdoteForm />
    </div>
  )
}

export default App