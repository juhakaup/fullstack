import anecdoteService from '../services/anecdotes'

const initialState = []
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'UPDATE':
      const id = action.data.id
      const newAnecdotes = state.map(anecdote => 
        anecdote.id !== id ? anecdote : action.data)
      return newAnecdotes
    case 'INIT':
      return action.data
    default: return state
  }
}

export const incrementVotesOf = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.getOne(id)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const newAnecdote = await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'UPDATE',
      data: newAnecdote
    })
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