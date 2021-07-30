import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'

const reducers = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

export const store = createStore(
  reducers,
  applyMiddleware(thunk)
)