require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//   },
//   {
//     "name": "a",
//     "number": "a",
//     "id": 5
//   },
//   {
//     "name": "b",
//     "number": "b",
//     "id": 6
//   },
//   {
//     "name": "c",
//     "number": "c",
//     "id": 7
//   },
//   {
//     "name": "d",
//     "number": "d",
//     "id": 8
//   },
//   {
//     "name": "e",
//     "number": "e",
//     "id": 9
//   },
//   {
//     "name": "f",
//     "number": "f",
//     "id": 10
//   },
//   {
//     "name": "g",
//     "number": "g",
//     "id": 11
//   }
// ]

const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next()
}

// 创建服务器
const app = express()
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// 创建路由
app.get('/info', (req, res, next) => {
  Person.count().then(count => {
    res.send(`
      <p>Phonebook has info for ${count} persons</p>
      <br/>
      <p>${new Date().toString()}</p>
    `)
  }).catch(err => next(err))
})
app.get('/api/persons', (req, res, next) => {
  // res.json(persons)
  Person.find().then(persons => res.json(persons)).catch(err => next(err))
})
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: "name is missing"
    })
  }
  // if (persons.some(data => data.name === body.name)) {
  //   return res.status(400).json({
  //     error: "name must be unique"
  //   })
  // }
  if (!body.number) {
    return res.status(400).json({
      error: "number is missing"
    })
  }

  // const person = {
  //   name: body.name,
  //   number: body.number || '',
  //   id: Math.ceil((Math.random() * 100000))
  // }

  // persons = persons.concat(person)

  // res.json(person)

  const person = new Person({
    name: body.name,
    number: body.number || '',
  })
  person.save().then(savedPerson => res.json(savedPerson)).catch(err => next(err))
})
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: "name is missing"
    })
  }
  // if (persons.some(data => data.name === body.name)) {
  //   return res.status(400).json({
  //     error: "name must be unique"
  //   })
  // }
  if (!body.number) {
    return res.status(400).json({
      error: "number is missing"
    })
  }

  // 此处不能使用new Person，否则会自动生成新的_id导致更新失败
  const person = {
    name: body.name,
    number: body.number || '',
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true }).then(updatedPerson => res.json(updatedPerson)).catch(err => next(err))
})
app.get('/api/persons/:id', (req, res, next) => {
  // const id = +req.params.id
  // const person = persons.find(data => data.id === id)
  // if (person) {
  //   res.json(person)
  // } else {
  //   res.status(404).end()
  // }
  Person.findById(req.params.id).then(person => res.json(person)).catch(err => next(err))
})
app.delete('/api/persons/:id', (req, res, next) => {
  // const id = +req.params.id
  // const index = persons.findIndex(data => data.id === id)
  // if (index != -1) {
  //   persons.splice(index, 1)
  //   res.status(204).end()
  // } else {
  //   res.status(404).end()
  // }

  Person.findByIdAndRemove(req.params.id).then(result => res.status(204).end()).catch(err => next(err))
})

app.use(errorHandler)

// 监听端口
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))