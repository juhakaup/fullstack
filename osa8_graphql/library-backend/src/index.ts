import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { makeExecutableSchema } from "@graphql-tools/schema"
import express from "express";
import cors from "cors";
import http from "http";

import mongoose, { plugin } from "mongoose";
import User from "./models/user";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import typeDefs from "./schema";
import resolvers from "./resolvers";

const MONGODB_URI = process.env.MONGODB_URI || "";

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

interface MyContext {
  currentUser?: typeof User;
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const start = async () => {
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        let currentUser = null;
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          currentUser = await User.findById(decodedToken.id)
        }
        return { currentUser }
      }
    }),
  )
};
start();

const PORT = 4000;
   httpServer.listen(PORT, () => 
   console.log(`server is running on http://localhost:${PORT}`));
