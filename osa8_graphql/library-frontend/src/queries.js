import { gql } from '@apollo/client'

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
  query {
    allBooks {
      author
      title
      published
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
      title
      author
      id
      genres
      published
    }
  }
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