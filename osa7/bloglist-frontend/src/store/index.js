import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import loginReducer from '../reducers/loginReducer'

const reducers = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  user: loginReducer
})

export const store = createStore(
  reducers,
  applyMiddleware(thunk)
)