import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import * as personService from './services/persons'

const App = () => {
  console.log('render')
  // 改为使用effectHook获取数据
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [keyword, setKeyword] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(list => setPersons(list))
  }, [])

  const addPerson = (newPerson) => {
    const existPerson = persons.find(person => person.name === newPerson.name)
    if (existPerson) {
      let confirm = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        newPerson.id = existPerson.id
        return personService.update(existPerson.id, newPerson).then(updatedPerson => {
          let copy = [...persons]
          let index = copy.findIndex(data => data.id === newPerson.id)
          copy.splice(index, 1, updatedPerson)
          setPersons(copy)
          return true
        })
      } else {
        return Promise.reject(false)
      }
    }
    return personService.create(newPerson).then(createdPerson => {
      setPersons(persons.concat(createdPerson))
      return true
    })
  }

  const handleFilter = (text) => {
    setKeyword(text)
  }

  const handleRemove = (id) => {
    let copy = [...persons]
    let index = copy.findIndex(data => data.id === id)
    copy.splice(index, 1)
    setPersons(copy)
  }

  const shownPersons = keyword ? persons.filter(person => person.name.toLowerCase().indexOf(keyword) !== -1) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter}></Filter>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson}></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={shownPersons} onRemove={handleRemove}></Persons>
    </div>
  )
}

export default App