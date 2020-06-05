import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import axios from 'axios'

const App = () => {
  console.log('render')
  // 改为使用effectHook获取数据
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [persons, setPersons] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => setPersons(res.data))
  }, [])

  const addPerson = (newPerson) => {
    const exists = persons.some(person => person.name === newPerson.name)
    if (exists) {
      alert(`${newPerson.name} is already added to phonebook`)
      return false
    }

    setPersons(persons.concat(newPerson))
    return true
  }

  const handleFilter = (text) => {
    setKeyword(text)
  }

  const shownPersons = keyword ? persons.filter(person => person.name.toLowerCase().indexOf(keyword) !== -1) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter}></Filter>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson}></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={shownPersons}></Persons>
    </div>
  )
}

export default App