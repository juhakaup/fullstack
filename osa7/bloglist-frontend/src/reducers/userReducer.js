const userReducer = (state=null, action) => {
  switch (action.type) {
  case 'SETUSER':
    console.log(action.data)
    return action.data
  case 'REMOVEUSER':
    return null
  default:
    return state
  }
}

export const storeUser = (user) => {
  return {
    type: 'SETUSER',
    data: user
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVEUSER'
  }
}

export default userReducer