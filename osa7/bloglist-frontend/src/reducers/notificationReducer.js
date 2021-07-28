const reducer = (state=null, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return {
      ...state,
      notification: action.data.message
    }
  case 'CLEAR':
    return {
      ...state,
      notification: null
    }
  default:
    return state
  }
}

let timeoutId
let timeout = 5
export const setNotification = (message) => {
  if (timeoutId !== undefined) {
    clearTimeout(timeoutId)
  }
  return async dispatch => {
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout * 1000)

    dispatch({
      type: 'NOTIFY',
      data: { message }
    })
  }
}

export default reducer