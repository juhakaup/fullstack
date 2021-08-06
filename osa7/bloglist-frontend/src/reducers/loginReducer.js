const loginReducer = (state=null, action) => {
  switch (action.type) {
  case 'REMOVE_USER':
    return null
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logoutUser = () => {
  return {
    type: 'REMOVE_USER'
  }
}

export default loginReducer