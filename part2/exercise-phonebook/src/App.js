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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: 'error',
  })

  // 获取所有数据
  useEffect(() => {
    personService.getAll().then(list => setPersons(list))
  }, [])

  // 处理数据搜索
  const handleFilter = (event) => {
    setKeyword(event.target.value)
  }

  // 处理表单相关内容
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const addPerson = (event) => {
    event.preventDefault()

    const oldPerson = persons.find(person => person.name === newName)
    if (oldPerson) {
      let confirm = window.confirm(`${oldPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        oldPerson.number = newNumber
        return personService.update(oldPerson.id, oldPerson).then(updatedPerson => {
          let copy = [...persons]
          let index = copy.findIndex(data => data.id === oldPerson.id)
          copy.splice(index, 1, updatedPerson)
          setNotification({
            message: `Modified ${oldPerson.name}`,
            type: 'success',
          })
          setTimeout(() => {
            setNotification({
              message: null,
            })
          }, 2000)
          setPersons(copy)
          setNewName('')
          setNewNumber('')
        }, () => {
          setNotification({
            message: `Information of ${newName} has been removed from server`,
            type: 'error',
          })
          setTimeout(() => {
            setNotification({
              message: null,
            })
          }, 2000)
        })
      }
    }
    return personService.create({
      name: newName,
      number: newNumber
    }).then(createdPerson => {
      setNotification({
        message: `Added ${newName}`,
        type: 'success',
      })
      setTimeout(() => {
        setNotification({
          message: null,
        })
      }, 2000)
      setPersons(persons.concat(createdPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  // 处理删除通讯录
  const handleRemove = (person) => {
    let confirm = window.confirm(`Delete ${person.name} ?`)
    if (confirm) {
      personService.remove(person.id).then(() => {
        let copy = [...persons]
        let index = copy.findIndex(data => data.id === person.id)
        copy.splice(index, 1)
        setPersons(copy)
      })
    }
  }

  const shownPersons = keyword ? persons.filter(person => person.name.toLowerCase().indexOf(keyword) !== -1) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type}></Notification>
      <Filter onChange={handleFilter}></Filter>
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={shownPersons} onRemove={handleRemove}></Persons>
    </div>
  )
}

export default App