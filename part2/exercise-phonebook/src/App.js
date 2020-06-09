import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import * as personService from './services/persons'

const App = () => {
  // 改为使用effectHook获取数据
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [keyword, setKeyword] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    type: 'error',
  })

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
          setNotification({
            message: `Modified ${newPerson.name}`,
            type: 'success',
          })
          setTimeout(() => {
            setNotification({
              message: null,
            })
          }, 2000)
          setPersons(copy)
          return true
        }, error => {
          setNotification({
            message: `Information of ${newPerson.name} has been removed from server`,
            type: 'error',
          })
          setTimeout(() => {
            setNotification({
              message: null,
            })
          }, 2000)
          return false
        })
      } else {
        return Promise.reject(false)
      }
    }
    return personService.create(newPerson).then(createdPerson => {
      setNotification({
        message: `Added ${newPerson.name}`,
        type: 'success',
      })
      setTimeout(() => {
        setNotification({
          message: null,
        })
      }, 2000)
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
      <Notification message={notification.message} type={notification.type}></Notification>
      <Filter onChange={handleFilter}></Filter>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson}></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={shownPersons} onRemove={handleRemove}></Persons>
    </div>
  )
}

export default App