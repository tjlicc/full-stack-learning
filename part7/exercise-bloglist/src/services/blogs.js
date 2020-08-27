import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, newObject, config).then(res => res.data)
}

const like = (id, likes) => {
  return axios.put(`${baseUrl}/${id}`, { likes }).then(res => res.data)
}

export default { getAll, setToken, create, like }