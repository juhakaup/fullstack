import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import Author from "./models/author";
import Book from "./models/book";
import User from "./models/user";
import { PubSub } from "graphql-subscriptions"
const pubSub = new PubSub();

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

        pubSub.publish("BOOK_ADDED", { bookAdded: newBook })

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

    Subscription: {
      bookAdded: {
        subscribe: () => pubSub.asyncIterator("BOOK_ADDED")
      },
    },
  }

  export default resolvers;