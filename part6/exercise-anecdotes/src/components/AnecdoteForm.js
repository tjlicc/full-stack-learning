import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { notify, cancelNotify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(create(content))
    dispatch(notify(`you created '${content}'`))
    setTimeout(() => {
      dispatch(cancelNotify())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name="content" />
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm