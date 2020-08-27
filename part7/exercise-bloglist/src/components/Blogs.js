import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )
      }
    </div>
  )
}

export default Blogs