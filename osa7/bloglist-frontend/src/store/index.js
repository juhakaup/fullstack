import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'

const reducers = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer
})

export const store = createStore(
  reducers,
  applyMiddleware(thunk)
)