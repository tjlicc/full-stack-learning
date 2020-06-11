const express = require('express')
const cors = require('cors')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(data => data.id)) : 0
  return maxId + 1
}

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

const app = express()
app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})
app.get('/api/notes', (req, res) => {
  res.json(notes)
})
app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }
  notes = notes.concat(note)

  res.json(note)
})

app.get('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  const note = notes.find(data => data.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})
app.delete('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  const index = notes.findIndex(data => data.id === id)
  if (index != -1) {
    notes.splice(index, 1)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})
app.put('/api/notes/:id', (req, res) => {
  const body = req.body
  const id = body.id
  const index = notes.findIndex(data => data.id === id)
  if (index != -1) {
    notes.splice(index, 1, body)
    res.json(body)
  } else {
    res.status(404).end()
  }
})

app.use(unkownEndpoint)

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})