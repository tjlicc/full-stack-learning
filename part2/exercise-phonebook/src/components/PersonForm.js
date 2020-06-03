import React, { useState } from 'react'

const PersonForm = ({ onSubmit }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const success = onSubmit(newPerson)
    if (!success) {
      return
    } else {
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input type="text" value={newName} onChange={handleNameChange} /></div>
      <div>number: <input type="text" value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm