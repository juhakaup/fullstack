import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose";
import Author from "./models/author";
import Book from "./models/book";
import User from "./models/user";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { GraphQLError } from "graphql";

const MONGODB_URI = process.env.MONGODB_URI || "";

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    recommended: [Book]
    id: ID!
  }

  type Token {
    value: String!
  }

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
    login(username: String, password: String): Token
    me: User
    recommended: [Book]
    allGenres: [String]!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
        if (author) {
          params.author = author.id;
        }
      }
      if (args.genre) {
        params.genres = args.genre;
      }
      return await Book.find(params).populate('author');
    },

    allAuthors: async () => Author.find({}),

    me: async (root, args, context) => {
      const usr = await User.findById(context.currentUser._id)
      return context.currentUser;
    },

    allGenres:async () => {
      return await Book.find({}).distinct('genres')
    }
  },

  Author: {
    bookCount: async ( root ) => {
      return (await (Book.find({ author: root.id }))).length;
    },
  },

  User: {
    recommended: async ( root ) => {
      return await Book.find({ genres: root.favoriteGenre }).populate('author');
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      const newBook = new Book({ ...args, author: author })
      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      return newBook
    },

    editAuthor: async (roor, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null
      }

      author.born = args.setBornTo;
      return author.save()
    },

    createUser:async (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

      return user.save()
        .catch(error => {
          throw new GraphQLError('User creation failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})