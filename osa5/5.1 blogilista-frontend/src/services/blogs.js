import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = { headers: { Authorization: token }, }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = newBlog => {
  const config = { headers: { Authorization: token }, }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const update = newBlog => {
  const url = baseUrl+'/'+newBlog.id
  const config = { headers: { Authorization: token }, }
  const request = axios.put(url, newBlog, config)
  return request.then(response => response.data)
}

const remove = blog => {
  const url = baseUrl+'/'+blog.id
  const config = { headers: { Authorization: token }, }
  const request = axios.delete(url, config)
  return request.then(response => response.data)
}



export default { getAll, setToken, create, update, remove }