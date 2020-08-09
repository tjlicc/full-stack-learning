// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { voteTo } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'

// const AnecdoteList = () => {
//   const filter = useSelector(state => state.filter)
//   const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => filter ? anecdote.content.indexOf(filter) !== -1 : true))
//   const dispatch = useDispatch()

//   const vote = (id, content, oldVotes) => {
//     dispatch(voteTo(id, oldVotes + 1))
//     dispatch(setNotification(`you voted '${content}'`, 2))
//   }

//   return (
//     <>
//       {
//         anecdotes.map(anecdote =>
//           <div key={anecdote.id}>
//             <div>
//               {anecdote.content}
//             </div>
//             <div>
//               has {anecdote.votes}
//               <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
//             </div>
//           </div>
//         )
//       }
//     </>
//   )
// }

// export default AnecdoteList

import React from 'react'
import { connect } from 'react-redux'
import { voteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id, content, oldVotes) => {
    props.voteTo(id, oldVotes + 1)
    props.setNotification(`you voted '${content}'`, 5)
  }

  return (
    <>
      {
        props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

const mapStateToProps = (state) => {
  const filter = state.filter
  return {
    anecdotes: state.anecdotes.filter(anecdote => filter ? anecdote.content.indexOf(filter) !== -1 : true)
  }
}
const mapDispatchToProps = {
  voteTo,
  setNotification
}
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList