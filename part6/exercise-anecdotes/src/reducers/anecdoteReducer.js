import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const changedAnecdote = action.data
      return state.map(item => item.id === action.data.id ? changedAnecdote : item).sort((prev, next) => next.votes - prev.votes)
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const voteTo = (id, votes) => {
  return dispatch => {
    anecdoteService.vote(id, votes).then(changedAnecdote => dispatch({
      type: 'VOTE',
      data: changedAnecdote
    }))
  }
}

export const create = (content) => {
  return dispatch => {
    anecdoteService.createNewAnecdote(content).then(newAnecdote => dispatch({
      type: 'NEW',
      data: newAnecdote
    }))
  }
}

export const initialize = () => {
  return dispatch => {
    anecdoteService.getAll().then(anecdotes => dispatch({
      type: 'INIT',
      data: anecdotes
    }))
  }
}

export default reducer