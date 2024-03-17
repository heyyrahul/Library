import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { connection } from "./config/db.js";  

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
            listen: { port: 4000 }
        });
        console.log('Connected to Database');
        console.log(`Server ready at port: ${url}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();
 