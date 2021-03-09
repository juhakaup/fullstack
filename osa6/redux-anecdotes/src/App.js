import React from 'react'
import AndecdoteForm from './components/AndecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AndecdoteForm />
    </div>
  )
}

export default App