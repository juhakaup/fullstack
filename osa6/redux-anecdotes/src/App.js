import React from 'react'
import AndecdoteForm from './components/AndecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AndecdoteForm />
    </div>
  )
}

export default App