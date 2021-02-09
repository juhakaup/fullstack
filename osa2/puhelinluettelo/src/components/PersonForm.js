import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons }) => {
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
          })
          setNewName('')
          setnewNumber('')
        } else {
          console.log('virhe: nimi on jo listassa')
          window.alert(`${newName} is already added to phonebook`)
        }
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