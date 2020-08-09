// import React from 'react'
// import { toggleImportanceOf } from '../reducers/noteReducer'
// import { useSelector, useDispatch } from 'react-redux'

// const Notes = () => {
//   const dispatch = useDispatch()
//   const notes = useSelector(state => {
//     if (state.filter === 'ALL') {
//       return state.notes
//     }
//     return state.filter === 'IMPORTANT' ? state.notes.filter(note => note.important) : state.notes.filter(note => !note.important)
//   })

//   const toggleImportance = (id) => {
//     dispatch(toggleImportanceOf(id))
//   }

//   return (
//     <ul>
//       {
//         notes.map(note =>
//           <li key={note.id} onClick={() => toggleImportance(note.id)}>
//             {note.content} <strong>{note.important ? 'important' : ''}</strong>
//           </li>
//         )
//       }
//     </ul>
//   )
// }

// export default Notes

/**
 * 使用connect的方式改造组件
 * 从react hooks api推出来后，就不建议使用connect的方式了，尽量用hooks
 */
import React from 'react'
import { toggleImportanceOf } from '../reducers/noteReducer'
import { connect } from 'react-redux'

const Notes = (props) => {
  return (
    <ul>
      {
        props.notes.map(note =>
          <li key={note.id} onClick={() => {
            props.toggleImportanceOf(note.id)
          }}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )
      }
    </ul>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes
    }
  }
  return {
    notes: state.filter === 'IMPORTANT' ? state.notes.filter(note => note.important) : state.notes.filter(note => !note.important)
  }
}
const mapDispatchToProps = {
  toggleImportanceOf
}
const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default ConnectedNotes