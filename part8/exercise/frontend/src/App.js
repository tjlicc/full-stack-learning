
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'
import Notify from './components/Notify'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {
        page === 'authors' && (authorResult.loading ? <div>loading...</div> : <Authors show={page === 'authors'} authors={authorResult.data.allAuthors} />)
      }

      {
        page === 'books' && (bookResult.loading ? <div>loading...</div> : <Books show={page === 'books'} books={bookResult.data.allBooks} />)
      }

      <NewBook show={page === 'add'} setError={setErrorMessage} />

    </div>
  )
}

export default App