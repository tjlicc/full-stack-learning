const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as a argument: node mongo.js <password>')
  process.exit(1)
}

const password = encodeURI(process.argv[2])

// mongodb connection string format
// mongodb://[username:password@]host[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
// If the username or password includes the at sign @, colon :, slash /, or the percent sign % character, use percent encoding.
const url = `mongodb://127.0.0.1:27017/notes`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})
const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true
})

// note.save().then(result => {
//   console.log('note saved!');
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
