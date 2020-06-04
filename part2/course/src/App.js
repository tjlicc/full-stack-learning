import React, { useState, useEffect } from 'react'
import Note from './components/Note'

import axios from 'axios'

const App = () => {
  // 不使用传入的数据，而是使用useEffect获取数据
  // const [notes, setNotes] = useState(props.notes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('use effect')
    axios.get('http://localhost:3001/notes').then(res => {
      console.log('promise fulfilled')
      setNotes(res.data)
    })
  }

  // 如果不加第二个参数，useEffect会在每次重新渲染时都执行一次
  // 第二个参数用于控制useEffect的执行频率
  useEffect(hook, [])
  console.log(`render ${notes.length} notes`)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {/* 不建议使用数组下标作为元素的key，这会产生不可预测的问题 */}
        {/* {notes.map((note, i) => <li key={i}>{note.content}</li>)} */}
        {notesToShow.map(note => <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App