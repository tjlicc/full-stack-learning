/**
 * 不使用router
 */
// import React, { useState } from 'react'

// const Home = () => {
//   return (
//     <div>
//       <h2>TKTL notes app</h2>
//     </div>
//   )
// }

// const Notes = () => {
//   return (
//     <div>
//       <h2>notes</h2>
//     </div>
//   )
// }

// const Users = () => {
//   return (
//     <div>
//       <h2>users</h2>
//     </div>
//   )
// }

// const App = () => {
//   const [page, setPage] = useState('home')

//   const toPage = page => event => {
//     event.preventDefault()
//     setPage(page)
//   }

//   const content = () => {
//     switch (page) {
//       case 'home':
//         return <Home />
//       case 'notes':
//         return <Notes />
//       case 'users':
//         return <Users />
//       default:
//         return <Home />
//     }
//   }

//   const padding = {
//     padding: 5
//   }

//   return (
//     <div>
//       <div>
//         <a href="#home" onClick={toPage('home')} style={padding}>home</a>
//         <a href="#notes" onClick={toPage('notes')} style={padding}>notes</a>
//         <a href="#users" onClick={toPage('users')} style={padding}>users</a>
//       </div>

//       {content()}
//     </div>
//   )
// }

// export default App


/**
 * 使用router，并使用bootstrap库
 */
// import React, { useState } from 'react'
// import {
//   Switch, Route, Link, Redirect,
//   useHistory, useRouteMatch
// } from 'react-router-dom'
// import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap'

// const Home = () => {
//   return (
//     <div>
//       <h2>TKTL notes app</h2>
//       <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//     </div>
//   )
// }

// const Note = ({ note }) => {
//   return (
//     <div>
//       <h2>{note.content}</h2>
//       <div>{note.user}</div>
//       <div><strong>{note.important ? 'important' : ''}</strong></div>
//     </div>
//   )
// }

// const Notes = ({ notes }) => {
//   return (
//     <div>
//       <h2>Notes</h2>
//       <Table striped>
//         <tbody>
//           {notes.map(note =>
//             <tr key={note.id}>
//               <td>
//                 <Link to={`/notes/${note.id}`}>{note.content}</Link>
//               </td>
//               <td>{note.user}</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </div>
//   )
// }

// const Users = () => {
//   return (
//     <div>
//       <h2>Users</h2>
//       <ul>
//         <li>Matti Luukkainen</li>
//         <li>Juha Tauriainen</li>
//         <li>Arto Hellas</li>
//       </ul>
//     </div>
//   )
// }

// const Login = (props) => {
//   const history = useHistory()

//   const onSubmit = (event) => {
//     event.preventDefault()
//     props.onLogin('mluukkai')
//     history.push('/')
//   }

//   return (
//     <div>
//       <h2>login</h2>
//       <Form onSubmit={onSubmit}>
//         <Form.Group>
//           <Form.Label>username:</Form.Label>
//           <Form.Control type="text" name="username"></Form.Control>
//           <Form.Label>password:</Form.Label>
//           <Form.Control type="password" ></Form.Control>
//           <Button variant="primary" type="submit">login</Button>
//         </Form.Group>
//       </Form>
//     </div>
//   )
// }

// const App = () => {
//   const [notes, setNotes] = useState([
//     {
//       id: "1",
//       content: 'HTML is easy',
//       important: true,
//       user: 'Matti Luukkainen'
//     },
//     {
//       id: "2",
//       content: 'Browser can execute only Javascript',
//       important: false,
//       user: 'Matti Luukkainen'
//     },
//     {
//       id: "3",
//       content: 'Most important methods of HTTP-protocol are GET and POST',
//       important: true,
//       user: 'Arto Hellas'
//     }
//   ])

//   const [user, setUser] = useState(null)
//   const [message, setMessage] = useState(null)

//   const login = (user) => {
//     setUser(user)
//     setMessage(`welcome ${user}`)
//     setTimeout(() => {
//       setMessage(null)
//     }, 10000)
//   }

//   const padding = {
//     padding: 5
//   }

//   const match = useRouteMatch('/notes/:id')
//   const note = match ? notes.find(item => item.id === match.params.id) : null

//   return (
//     <div className="container">
//       {
//         (message &&
//           <Alert variant="success">{message}</Alert>
//         )
//       }
//       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link href="#" as="span">
//               <Link style={padding} to="/">home</Link>
//             </Nav.Link>
//             <Nav.Link href="#" as="span">
//               <Link style={padding} to="/notes">notes</Link>
//             </Nav.Link>
//             <Nav.Link href="#" as="span">
//               <Link style={padding} to="/users">users</Link>
//             </Nav.Link>
//             <Nav.Link href="#" as="span">
//               {user
//                 ? <em>{user} logged in</em>
//                 : <Link to="/login">login</Link>
//               }
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>

//       <Switch>
//         <Route path="/notes/:id">
//           <Note note={note} />
//         </Route>
//         <Route path="/notes">
//           <Notes notes={notes} />
//         </Route>
//         <Route path="/users">
//           {user ? <Users /> : <Redirect to="/login" />}
//         </Route>
//         <Route path="/login">
//           <Login onLogin={login} />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//       <div>
//         <i>Note app, Department of Computer Science 2020</i>
//       </div>
//     </div>
//   )
// }

// export default App

/**
 * 使用router，并使用material库和styled-components库
 */
import React, { useState } from 'react'
import {
  Switch, Route, Link, Redirect,
  useHistory, useRouteMatch
} from 'react-router-dom'
import { Container, TableContainer, Paper, Table, TableBody, TableRow, TableCell, TextField, Button, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import styled from 'styled-components'

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
  )
}

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map(note =>
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.user}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
    </div>
  )
}

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username"></TextField>
        </div>
        <div>
          <TextField label="password" type="password"></TextField>
        </div>
        <Button variant="contained" color="primary" type="submit">login</Button>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: "1",
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: "2",
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: "3",
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const Footer = styled.div`
    background: Chocolate;
    padding: 1em;
    margin-top: 1em;
  `

  const match = useRouteMatch('/notes/:id')
  const note = match ? notes.find(item => item.id === match.params.id) : null

  return (
    <Container>
      {
        (message &&
          <Alert severity="success">{message}</Alert>
        )
      }
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
          <Button color="inherit" component={Link} to="/">home</Button>
          <Button color="inherit" component={Link} to="/notes">notes</Button>
          <Button color="inherit" component={Link} to="/users">users</Button>
          {user
            ? <em>{user} logged in</em>
            : <Button color="inherit" component={Link} to="/login">
              login
        </Button>
          }
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/notes/:id">
          <Note note={note} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer>
        <i>Note app, Department of Computer Science 2020</i>
      </Footer>
    </Container>
  )
}

export default App
