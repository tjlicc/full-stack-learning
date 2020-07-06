import React, { useState } from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog, likeChange }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailVisible(!detailVisible)
  }

  const addLike = async (id, likes) => {
    const returnedBlog = await BlogService.like(id, likes)
    likeChange(returnedBlog)
  }

  return (
    < div className="blog" >
      {blog.title}
      <button style={hideWhenVisible} onClick={toggleVisibility} className="view-btn">view</button>
      <button style={showWhenVisible} onClick={toggleVisibility} className="hide-btn">hide</button>
      <div style={showWhenVisible} className="toggledContent">
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={() => addLike(blog.id, blog.likes + 1)} className="like-btn">like</button>
        </p>
        <p>author: {blog.author}</p>
      </div>
    </div >
  )
}

export default Blog
