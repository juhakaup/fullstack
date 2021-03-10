const reducer = (state = null, action) => {
  if (action.type === 'NOTIFY') {
    console.log(action)
    state = action.data.message
  } else if (action.type === 'CLEAR') {
    state = null
  }
  return state
}

export const displayNotification = (message) => {
  return {
    type: 'NOTIFY',
    data: { message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}


export default reducer