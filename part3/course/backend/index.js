require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map(data => data.id)) : 0
//   return maxId + 1
// }

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}

const errorHandler = (err, request, response, next) => {
  console.log(err)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  }

  next()
}

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})
app.get('/api/notes', (req, res) => {
  // res.json(notes)
  Note.find().then((notes) => res.json(notes))
})
app.post('/api/notes', (req, res, next) => {
  const body = req.body

  // if (!body.content) {
  //   return res.status(400).json({
  //     error: 'content missing'
  //   })
  // }

  // const note = {
  //   content: body.content,
  //   important: body.important || false,
  //   date: new Date(),
  //   id: generateId()
  // }
  // notes = notes.concat(note)

  // res.json(note)
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })
  note.save().then(savedNote => res.json(savedNote)).catch(err => next(err))
})

app.get('/api/notes/:id', (req, res, next) => {
  // const id = +req.params.id
  // const note = notes.find(data => data.id === id)

  // if (note) {
  //   res.json(note)
  // } else {
  //   res.status(404).end()
  // }
  Note.findById(req.params.id).then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  }).catch(err => next(err))
})
app.delete('/api/notes/:id', (req, res, next) => {
  // const id = +req.params.id
  // const index = notes.findIndex(data => data.id === id)
  // if (index != -1) {
  //   notes.splice(index, 1)
  //   res.status(204).end()
  // } else {
  //   res.status(404).end()
  // }

  Note.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end
  }).catch(err => next(err))
})
app.put('/api/notes/:id', (req, res, next) => {
  // const body = req.body
  // const id = body.id
  // const index = notes.findIndex(data => data.id === id)
  // if (index != -1) {
  //   notes.splice(index, 1, body)
  //   res.json(body)
  // } else {
  //   res.status(404).end()
  // }

  const body = req.body
  const note = {
    content: body.content,
    important: body.important,
  }
  Note.findByIdAndUpdate(req.params.id, note, { new: true }).then(updatedNote => res.json(updatedNote)).catch(err => next(err))
})

app.use(unkownEndpoint)
app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})