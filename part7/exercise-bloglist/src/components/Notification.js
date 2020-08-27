import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null || message === undefined) {
    return null
  }

  const className = `notification ${type}`
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification