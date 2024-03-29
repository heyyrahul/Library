import { ApolloServer } from "@apollo/server";
import express from 'express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { connection } from "./config/db.js";  
import cors from "cors";
import jwt from 'jsonwebtoken';
import{config}from 'dotenv'

config();
const app = express();
app.use(cors({origin:"http://localhost:5173/"}));

const server = new ApolloServer({
    typeDefs,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
          return { user };
        } catch (error) {
          console.error("Error verifying token:", error);
          return { user: null };
        }
      }, 
    resolvers
});




(async () => {
    try {
        await connection; 
        const { url } = await startStandaloneServer(server, {
            listen: { port: process.env.port }
        });
        console.log('Connected to Database');
        console.log(`Server ready at port: ${url}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();