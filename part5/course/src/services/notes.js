import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

export const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const create = (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, newObject, config).then(res => res.data)
}

export const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}
