const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW': {
    const newBlogs = [...state, action.data]
    return sortByLikes(newBlogs)
  }
  case 'INIT':
    return sortByLikes(action.data)
  case 'UPDATE': {
    const newBlogs = ( state.map(b => {
      if (b.id === action.data.id) {
        return({ ...b, likes: action.data.likes })
      } else {
        return b
      }
    }))
    //newBlogs.sort(function(a,b) {
    //  return b.likes - a.likes
    //})
    return sortByLikes(newBlogs)
  }
  case 'REMOVE': {
    const newBlogs = state.filter(b => b.id !== action.data.id)
    return sortByLikes(newBlogs)
  }
  default:
    return state
  }
}

const sortByLikes = (blogs) => {
  blogs.sort(function(a,b) {
    return b.likes - a.likes
  })
  return blogs
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

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE',
    data: blog
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE',
    data: blog
  }
}

export default blogReducer