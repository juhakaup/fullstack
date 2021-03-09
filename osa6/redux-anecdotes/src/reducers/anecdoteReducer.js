const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    const id = action.data.id
    const anecdote = state.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdote, votes: anecdote.votes + 1
    }
    const newAnecdotes = state.map(anec => 
      anec.id !== id ? anec : updatedAnecdote)
    newAnecdotes.sort(function(a,b) {return b.votes - a.votes})
    return newAnecdotes  
  } else if (action.type === 'NEW') {
    const newAnecdote = {
      content: action.data.content,
      id: getId(),
      votes: 0
    }
    return state.concat(newAnecdote)
  }
  return state
}

export const incrementVotesOf = (id) => {
  return {
    type: 'INCREMENT',
    data: { id }
  }
}

export const addNewAnecdote = (content) => {
  return {
    type: 'NEW',
    data: { content }
  }
}

export default reducer