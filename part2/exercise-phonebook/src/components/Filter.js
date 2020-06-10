import React from 'react'

const Filter = ({ keyword, onChange }) => {
  return (
    <div>fitler shown with <input type="text" value={keyword} onChange={onChange} /></div>
  )
}

export default Filter