import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const newBook = data.data.bookAdded;
      window.alert(`New book added to the database: ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name}`);
      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: null } }, newBook)
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
        ? <> 
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommend</button>
          <button onClick={logout}>logout</button>
          </>
        : <>
          <button onClick={() => setPage('login')}>login</button>
          </>}

      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>
      
      <Recommendations show={page === 'recommendations'} />
    </div>
  )
}

export default App
