import React, { useState } from 'react'

const Filter = ({ onChange }) => {
  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
    onChange(event.target.value)
  }

  return (
    <div>fitler shown with <input type="text" value={keyword} onChange={handleKeywordChange} /></div>
  )
}

export default Filter