const reducer = (state = '', action) => {
  if (action.type === 'SETFILTER') {
    return action.filter
  }
  return state
}

export const changeFilter = filter => {
  return {
    type: 'SETFILTER',
    filter
  }
}

export default reducer