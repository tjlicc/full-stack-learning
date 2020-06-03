import React from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* 不建议使用数组下标作为元素的key，这会产生不可预测的问题 */}
        {/* {notes.map((note, i) => <li key={i}>{note.content}</li>)} */}
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>
    </div>
  )
}

export default App