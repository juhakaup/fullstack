import personService from '../services/persons'

const Persons = ({ removePerson, filteredPersons }) => {
    return (
    <ul>
    {filteredPersons.map(person => 
        <li key={person.name}>
            {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
            </li>
        )}
    </ul>
    )
}

export default Persons