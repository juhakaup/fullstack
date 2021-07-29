const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW':
    console.log(action.data)
    return [...state, action.data]
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const addNewblog = (blog) => {
  return {
    type: 'NEW',
    data: blog
  }
}

export const initBlogs = (blogs) => {
  return {
    type: 'INIT',
    data: blogs
  }
}

export default blogReducer