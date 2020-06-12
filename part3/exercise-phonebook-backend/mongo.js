const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as a argument: node mongo.js <password> [<name> <number>]')
  process.exit(1)
}

const password = encodeURI(process.argv[2])
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://127.0.0.1:27017/phonebook`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (name) {
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(res => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find().then(res => {
    console.log('phonebook:')
    res.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}