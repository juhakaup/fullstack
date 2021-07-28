const reducer = (state=null, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return {
      ...state,
      message: action.data.message,
      style: 'notification'
    }
  case 'ERROR':
    return {
      ...state,
      message: action.data.message,
      style: 'error'
    }
  case 'CLEAR':
    return {
      ...state,
      message: null
    }
  default:
    return state
  }
}

let timeoutId
let timeout = 5
export const setNotification = ( message, style ) => {
  if (timeoutId !== undefined) {
    clearTimeout(timeoutId)
  }
  return async dispatch => {
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout * 1000)

    if (style === 'notification') {
      dispatch({
        type: 'NOTIFY',
        data: { message }
      })
    } else if (style === 'error') {
      dispatch({
        type: 'ERROR',
        data: { message }
      })
    } else {
      console.log('undefined notification style')
    }
  }
}

export default reducer