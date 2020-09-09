
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
            </>
            :
            <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      {
        page === 'authors' && (authorResult.loading ? <div>loading...</div> : <Authors show={page === 'authors'} authors={authorResult.data.allAuthors} />)
      }

      {
        page === 'books' && (bookResult.loading ? <div>loading...</div> : <Books show={page === 'books'} books={bookResult.data.allBooks} />)
      }

      <NewBook show={page === 'add'} setError={setErrorMessage} />

      <LoginForm show={page === 'login'} setError={setErrorMessage} setToken={setToken} setPage={setPage}></LoginForm>

    </div>
  )
}

export default App