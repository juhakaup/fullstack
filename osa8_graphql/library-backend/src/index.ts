import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from "mongoose"
import Author from "./models/author"
import Book from "./models/book"

import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

interface params {
  author?: string
  genres?: string
}

const resolvers = {
  Query: {
    bookCount: async () => (await Book.find({})).length,
    authorCount: async () => (await Author.find({})).length,
    allBooks: async (root, args) => {
      let params:params = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        params.author = author.id;
      }
      if (args.genre) {
        params.genres = args.genre;
      }
      return await Book.find(params).populate('author');
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async ( root ) => {
      return (await (Book.find({ name: root.name }))).length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        author.save();
      }

      const newBook = new Book({ ...args, author: author })
      return newBook.save()
    },
    editAuthor: async (roor, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null
      }

      author.born = args.setBornTo;
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})