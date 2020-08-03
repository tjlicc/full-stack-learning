import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const filterSelected = (value) => {
    dispatch(filterChange(value));
  }

  return (
    <div>
      all
      <input type="radio" name="filter" defaultChecked={filter === 'ALL'} onChange={() => { filterSelected('ALL') }} />
      important
      <input type="radio" name="filter" defaultChecked={filter === 'IMPORTANT'} onChange={() => { filterSelected('IMPORTANT') }} />
      nonimportant
      <input type="radio" name="filter" defaultChecked={filter === 'NONIMPORTANT'} onChange={() => { filterSelected('NONIMPORTANT') }} />
    </div>
  )
}

export default VisibilityFilter