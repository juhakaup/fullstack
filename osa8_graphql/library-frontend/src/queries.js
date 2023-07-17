import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
      recommended {
        title
        published
        author {
          name
        }
      }
    }
  }
`

export const NEW_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $genres: [String!]!, $published: Int!) {
    addBook(
      title: $title, 
      author: $author, 
      genres: $genres,
      published: $published,
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
      ) {
        name
        born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
` 

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`