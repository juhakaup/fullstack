import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('success')
  const [persons, setPersons] = useState([]) 
  const [newFilter, setFilter] = useState('')
  const filteredPersons = (persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()) 
    || person.number.includes(newFilter) 
  ))
  const handleFilterChange = (event) => setFilter(event.target.value)

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      setNotificationStyle('success')
      setNotificationMessage(`${person.name} removed`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={notificationStyle} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        setNotification={setNotificationMessage} 
        setNotificationStyle={setNotificationStyle} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} removePerson={removePerson}/>
    </div>
  )
}

export default App