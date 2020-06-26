import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import * as noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  // 不使用传入的数据，而是使用useEffect获取数据
  // const [notes, setNotes] = useState(props.notes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // 如果不加第二个参数，useEffect会在每次重新渲染时都执行一次
  // 第二个参数用于控制useEffect的执行频率
  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = localStorage.getItem('loggedNoteappUser')
    console.log(loggedUserJson)
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  console.log(`render ${notes.length} notes`)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id应该交由服务器来生成
      // id: notes.length + 1
    }

    // 改成post请求，添加数据
    // setNotes(notes.concat(noteObject))
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (note) => {
    const changedNote = { ...note, important: !note.important }
    noteService.update(note.id, changedNote).then(returnedNote => {
      setNotes(notes.map(data => data.id === note.id ? returnedNote : data))
    }).catch(error => {
      setErrorMessage(`Note ${note.content} was already deleted from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(data => data.id !== note.id))
    })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loignForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <input type="text" name="Username" value={username} onChange={({ target }) => { setUsername(target.value) }} />
        </div>
        <div>
          <input type="password" name="Password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  const noteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>

      {
        user === null ? loignForm() :
          <div>
            <p>{user.name} logged in</p>
            {noteForm()}
          </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {/* 不建议使用数组下标作为元素的key，这会产生不可预测的问题 */}
        {/* {notes.map((note, i) => <li key={i}>{note.content}</li>)} */}
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note)} />)}
      </ul>
      <Footer></Footer>
    </div>
  )
}

export default App