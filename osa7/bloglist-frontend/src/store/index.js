import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'

export const store = createStore(
  notificationReducer,
  applyMiddleware(thunk)
)