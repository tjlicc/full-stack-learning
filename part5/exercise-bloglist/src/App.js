import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
            <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password:
            <input type="password" name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  const logout = () => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title, author, url
      })

      setBlogs(blogs.concat(newBlog))
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

  const blogPage = () => {
    return (
      <>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>

        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            author:
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            url:
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">create</button>
        </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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