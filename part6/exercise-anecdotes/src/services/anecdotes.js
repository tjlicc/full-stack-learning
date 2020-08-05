import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const createNewAnecdote = (content) => {
  const object = { content, votes: 0 }
  return axios.post(baseUrl, object).then(res => res.data)
}

const vote = (id, votes) => {
  return axios.patch(`${baseUrl}/${id}`, { votes }).then(res => res.data)
}

export default {
  getAll,
  createNewAnecdote,
  vote
}