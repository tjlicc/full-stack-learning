const mogoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mogoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mogoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})
schema.plugin(uniqueValidator)
schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // 密码不能传输到前端
    delete returnedObject.passwordHash
  }
})

const User = mogoose.model('User', schema)

module.exports = User