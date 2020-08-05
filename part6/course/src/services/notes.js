import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const createNew = (content) => {
  const object = { content, important: false }
  return axios.post(baseUrl, object).then(res => res.data)
}

export default { getAll, createNew }