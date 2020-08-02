import React from 'react'
import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const note = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(note))
  }

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote