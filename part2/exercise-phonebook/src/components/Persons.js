import React from 'react'

const Person = ({ persons, onRemove }) => {
  return (
    <div>
      {
        persons.map(person => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
              <button onClick={() => onRemove(person)}>delete</button>
            </p>
          )
        })}
    </div>
  )
}

export default Person