import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state)
  if (message === null || message.notification === null) {
    return null
  }

  return (
    <div className='notification'>
      {message.notification}
    </div>
  )
}

export default Notification