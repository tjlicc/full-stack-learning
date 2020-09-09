import React, { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('')

  if (!props.show) {
    return null
  }

  const books = props.books
  const genres = books.reduce((arr, book) => {
    book.genres.forEach(genre => arr.add(genre));
    return arr;
  }, new Set())

  const shownBooks = books.filter(book => filter ? book.genres.includes(filter) : true)

  return (
    <div>
      <h2>books {filter ? 'in genre' + filter : ''}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {shownBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(',')}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {
          [...genres].map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)
        }
      </div>
    </div>
  )
}

export default Books