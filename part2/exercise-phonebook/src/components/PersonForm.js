import React from 'react'

const PersonForm = ({ newName, newNumber, onSubmit, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input type="text" value={newName} onChange={onNameChange} /></div>
      <div>number: <input type="text" value={newNumber} onChange={onNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm