// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { create } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'

// const AnecdoteForm = () => {
//   const dispatch = useDispatch()

//   const createAnecdote = async (event) => {
//     event.preventDefault()

//     const content = event.target.content.value
//     event.target.content.value = ''
//     dispatch(create(content))
//     dispatch(setNotification(`you created '${content}'`, 5))
//   }

//   return (
//     <>
//       <h2>create new</h2>
//       <form onSubmit={createAnecdote}>
//         <input name="content" />
//         <button>create</button>
//       </form>
//     </>
//   )
// }

// export default AnecdoteForm

import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    props.create(content)
    props.setNotification(`you created '${content}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name="content" />
        <button>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  create,
  setNotification
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm