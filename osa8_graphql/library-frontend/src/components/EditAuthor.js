import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const authors = props.authors
  const [name, setName] = useState(authors[0].name)
  const [setBornTo, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
  <div>
  <h2>Set birthyear</h2>
    <form onSubmit={submit}>
      <div>
        author
        <select defaultValue={name} onChange={handleChange}>
          {authors.map(a => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
      </div>
      <div>
        born
        <input
          type="number"
          value={setBornTo}
          onChange={({ target }) => setBorn(Number(target.value))}
        />
      </div>
      <button type="submit">update author</button>
    </form>
    </div>
  )
}

export default EditAuthor