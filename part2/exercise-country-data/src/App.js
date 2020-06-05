import React, { useState } from 'react'
import Country from './components/Country'
import axios from 'axios'

const App = () => {
  const [keyword, setKeyword] = useState('')
  const [countries, setCountries] = useState([])

  const handleKeywordChange = (event) => {
    let text = event.target.value
    setKeyword(text)
    if (text && text.trim()) {
      axios.get('https://restcountries.eu/rest/v2/name/' + text).then(res => {
        let data = res.data || []
        data.forEach(country => country._showDetail = false)
        setCountries(data)
      })
    } else {
      setCountries([])
    }
  }

  const toggleShow = (countryName) => {
    return () => {
      const copy = [...countries]
      const index = copy.findIndex(data => data.name === countryName)
      copy[index]._showDetail = !copy[index]._showDetail
      setCountries(copy)
    }
  }

  const renderResult = () => {
    if (countries.length === 0) {
      return (
        <div></div>
      )
    } else if (countries.length === 1) {
      // 获取该国家的详细信息
      const [country] = countries
      return (
        <Country country={country}></Country>
      )
    } else if (countries.length > 1 && countries.length <= 10) {
      return countries.map(country => {
        return (
          <div key={country.name}>
            {country.name}
            <button onClick={toggleShow(country.name)}>{country._showDetail ? 'hide' : 'show'}</button>
            {country._showDetail && <Country country={country}></Country>}
          </div>
        )
      })
    } else {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
  }

  return (
    <div>
      find countries <input type="text" value={keyword} onChange={handleKeywordChange} />
      {renderResult()}
    </div>
  )
}

export default App