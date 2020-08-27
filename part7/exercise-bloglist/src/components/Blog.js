import React, { useState } from 'react'
import { addLike } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [detailVisible, setDetailVisible] = useState(false)

  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailVisible(!detailVisible)
  }

  const changeLike = async (id, likes) => {
    dispatch(addLike(id, likes))
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
          <button onClick={() => changeLike(blog.id, blog.likes + 1)} className="like-btn">like</button>
        </p>
        <p>author: {blog.author}</p>
      </div>
    </div >
  )
}

export default Blog
