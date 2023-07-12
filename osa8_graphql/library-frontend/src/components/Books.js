import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreSelector from './GenreSelector'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !props.show
  })

  useEffect(() => { 
    result.refetch() 
  }, [genre]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenreSelector setGenre={setGenre} selectedGenre={genre}/>
    </div>
  )
}

export default Books
