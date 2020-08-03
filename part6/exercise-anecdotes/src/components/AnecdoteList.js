import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteTo } from '../reducers/anecdoteReducer'
import { notify, cancelNotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => filter ? anecdote.content.indexOf(filter) !== -1 : true))
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteTo(id))
    dispatch(notify(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(cancelNotify())
    }, 5000)
  }

  return (
    <>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList