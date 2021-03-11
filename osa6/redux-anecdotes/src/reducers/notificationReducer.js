const reducer = (state = null, action) => {
  if (action.type === 'NOTIFY') {
    console.log(action)
    state = action.data.message
  } else if (action.type === 'CLEAR') {
    state = null
  }
  return state
}

export const setNotification = (message, time) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, time*1000)
    dispatch({
      type: 'NOTIFY',
      data: { message}
    })
  }
}


export default reducer