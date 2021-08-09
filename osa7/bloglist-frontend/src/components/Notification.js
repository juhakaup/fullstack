import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  if (notification === null || notification.message === null) {
    return null
  }

  var notificationStyle = 'success'

  if (notification.style === 'error') {
    notificationStyle = 'danger'
  }

  return (
    <>
      <Alert variant={notificationStyle}>
        {notification.message}
      </Alert>
    </>
  )
}

export default Notification