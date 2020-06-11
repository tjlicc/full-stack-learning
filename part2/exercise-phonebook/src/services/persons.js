import axios from 'axios'
const baseUrl = '/api/persons'

export const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(res => res.data)
}

export const update = (id, modifiedPerson) => {
  return axios.put(`${baseUrl}/${id}`, modifiedPerson).then(res => res.data)
}

export const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}