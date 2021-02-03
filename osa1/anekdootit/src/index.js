import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const nextAnecdote = () => {
    setSelected(Math.floor( Math.random() * Math.floor(props.anecdotes.length) ))
  }

  const setVote = (vote) => {
    const copy = [...votes]
    copy[vote] += 1
    setVotes(copy)
  }
  
  const vote = () => setVote(selected)

  return (
    <div>
      <div><Header text={'Anecdote of the day'} /></div>
      <div>
      {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <Button onClick={vote} text={'vote'} />
        <Button onClick={nextAnecdote} text={'next anecdote'} />
      </div>

      <div><Header text={'Anecdote with the most votes'} /></div>
      {props.anecdotes[largestElement(votes)]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Header = ({text}) => <h1>{text}</h1>

const largestElement = (array) => {
  var largest = 0
  var element = 0
  for (var i=0; i<array.length; i++) {
    if (largest < array[i]) {
      largest = array[i]
      element = i
    }
  }
  return element
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)