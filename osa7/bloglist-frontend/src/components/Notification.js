import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)
  if (notification === null || notification.message === null) {
    return null
  }

  return (
    <div className={notification.style}>
      {notification.message}
    </div>
  )
}

export default Notification