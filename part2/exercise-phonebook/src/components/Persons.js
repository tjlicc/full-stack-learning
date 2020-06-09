import React from 'react'
import * as personService from '../services/persons'

const Person = ({ persons, onRemove }) => {
  const removePerson = (person) => {
    let confirm = window.confirm(`Delete ${person.name} ?`)
    if (confirm) {
      personService.remove(person.id).then(() => {
        onRemove(person.id)
      })
    }
  }

  return (
    <div>
      {
        persons.map(person => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
              <button onClick={() => removePerson(person)}>delete</button>
            </p>
          )
        })}
    </div>
  )
}

export default Person