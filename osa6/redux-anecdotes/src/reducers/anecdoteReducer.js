import anecdoteService from '../services/anecdotes'

const initialState = []
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW':
      console.log(action.data)
      return [...state, action.data]
    case 'INCREMENT':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
      }
      const newAnecdotes = state.map(anec => 
        anec.id !== id ? anec : updatedAnecdote)
      newAnecdotes.sort(function(a,b) {return b.votes - a.votes})
      return newAnecdotes
    case 'INIT':
      return action.data
    default: return state
  }
}

export const incrementVotesOf = (id) => {
  return {
    type: 'INCREMENT',
    data: { id }
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export default reducer