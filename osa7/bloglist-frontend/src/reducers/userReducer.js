const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const initUsers = (users) => {
  console.log(users)
  return {
    type: 'INIT',
    data: users
  }
}

export default userReducer