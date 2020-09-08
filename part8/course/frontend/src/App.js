import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import Notify from './components/Notify';
import { ALL_PERSONS } from './queries';

function App() {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    // 每2秒查询一次数据，这个方式会浪费不必要的流量
    // pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons}></Persons>
      <PersonForm setError={notify}></PersonForm>
      <PhoneForm setError={notify}></PhoneForm>
    </div>
  );
}

export default App;
