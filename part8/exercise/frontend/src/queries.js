import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment authorDetails on Author {
    id
    name
    born
    bookCount
  }
`

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    id
    title 
    author {
      ...authorDetails
    }
    published 
    genres
  }

  ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...authorDetails
    }
  }

  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...bookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...bookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...authorDetails
    }
  }

  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }

  ${BOOK_DETAILS}
`
