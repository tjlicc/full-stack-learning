import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [notification, setNotification] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJsonStr = localStorage.getItem('loggedBlogAppUser')
    if (userJsonStr) {
      const user = JSON.parse(userJsonStr)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotification({
        message: 'Wrong credentials',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input id="username" type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password:
            <input id="password" type="password" name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </>
    )
  }

  const logout = () => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createNew = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))

      noteFormRef.current.toggleVisibility()
      setNotification({
        message: 'a new blog added',
        type: 'success'
      })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    } catch (e) {
      setNotification({
        message: 'Wrong credentials',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }

  const noteFormRef = useRef()
  const blogPage = () => {
    return (
      <>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>

        <Togglable ref={noteFormRef} buttonLabel="new note">
          <h2>create new</h2>
          <BlogForm createBlog={createNew}></BlogForm>
        </Togglable>

        <Blogs />
      </>
    )
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type}></Notification>
      {
        user === null ? loginForm() : blogPage()
      }
    </div>
  )
}

export default App