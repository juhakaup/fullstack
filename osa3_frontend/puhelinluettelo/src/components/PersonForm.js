import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, setNotification, setNotificationStyle }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setnewNumber] = useState('')
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setnewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const person = {
          name: newName,
          number: newNumber,
        }
        if (!(persons.map((person) => person.name)).includes(newName)) {
          personService
            .create(person)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNotificationStyle('success')
              setNotification(`Added ${newName}`)
          })
          .catch(error => {
            console.log(error.response.data)
            setNotificationStyle('error')
            setNotification(error.response.data.error)
          })
          setNewName('')
          setnewNumber('')
          
        } else {
          if (window.confirm(`${person.name} is already added to phonebook,  replace old number with a new one?`)) {
            const id = persons.filter(p => p.name === person.name)[0].id
            personService.update({id: id, ...person}).then(updatedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
              setNotificationStyle('success')
          setNotification(`Updated ${newName}`)
            }).catch(error => {
              setNotificationStyle('error')
              setNotification(`Information of ${newName} has already been removed from the server`)
            })
            setNewName('')
            setnewNumber('')
          }
        }
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }

    return (
        <form onSubmit={addPerson}>
      <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onSubmit={addPerson}>add</button>
        </div>
      </form>
    )
}

export default PersonForm