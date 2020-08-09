// import React from 'react'
// import { createNote } from '../reducers/noteReducer'
// import { useDispatch } from 'react-redux'

// const NewNote = () => {
//   const dispatch = useDispatch()

//   const addNote = async (event) => {
//     event.preventDefault()
//     const content = event.target.note.value
//     event.target.note.value = ''
//     dispatch(createNote(content))
//   }

//   return (
//     <form onSubmit={addNote}>
//       <input type="text" name="note" />
//       <button type="submit">add</button>
//     </form>
//   )
// }

// export default NewNote

import React from 'react'
import { createNote } from '../reducers/noteReducer'
import { connect } from 'react-redux'

const NewNote = (props) => {
  console.log(createNote);
  console.log(props.createNote);
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
  }

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button type="submit">add</button>
    </form>
  )
}

// 对象形式的mapDispatchToProps，connect函数会自动将属性封装成dispatch(prop)的形式
// const mapDispatchToProps = {
//   createNote
// }

// mapDispatchToProps的取值可以是函数，这种情况下需要自己调用dispatch
const mapDispatchToProps = dispatch => {
  return {
    createNote: value => dispatch(createNote(value))
  }
}
const ConnectedNewNote = connect(null, mapDispatchToProps)(NewNote)
export default ConnectedNewNote