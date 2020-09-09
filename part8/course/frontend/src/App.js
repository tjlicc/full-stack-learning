import React, { useState } from 'react';
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import { ALL_PERSONS, PERSON_ADDED } from './queries';

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ALL_PERSONS, {
    // 每2秒查询一次数据，这个方式会浪费不必要的流量
    // pollInterval: 2000
  })

  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) }
      })
    }
  }

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCacheWith(addedPerson)
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout} >logout</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons}></Persons>
      <PersonForm setError={notify} updateCacheWith={updateCacheWith}></PersonForm>
      <PhoneForm setError={notify}></PhoneForm>
    </div>
  );
}

export default App;
