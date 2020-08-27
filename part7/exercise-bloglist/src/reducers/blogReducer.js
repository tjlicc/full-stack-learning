import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_LIKE': {
    const blog = action.data
    return state.map(item => item.id === blog.id ? blog : item)
  }
  default:
    return state
  }
}

export const createBlog = newObject => {
  return dispatch => {
    blogService.create(newObject).then(blog => dispatch({
      type: 'NEW_BLOG',
      data: blog
    }))
  }
}

export const initializeBlogs = () => {
  return dispatch => {
    blogService.getAll().then(blogs => dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    }))
  }
}

export const addLike = (id, likes) => {
  return dispatch => {
    blogService.like(id, likes).then(blog => dispatch({
      type: 'ADD_LIKE',
      data: blog
    }))
  }
}

export default blogReducer