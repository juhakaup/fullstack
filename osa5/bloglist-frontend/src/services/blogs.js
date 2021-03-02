import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  // console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: {Authorization: token },
}

const response = await axios.post(baseUrl, newBlog, config)
return response.data
}

const update = async blog => {
      const updatedBlog = {
      user: blog.user.id,
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url
    }
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
  return response.data
}

export default { 
  getAll,
  create,
  update,
  setToken,
}