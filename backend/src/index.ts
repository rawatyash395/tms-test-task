import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { verifyToken } from './auth';
import { createShipmentLoader, createUserLoader } from './loaders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
      };
    },
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace('Bearer ', '') || '';
        
        let user = null;
        if (token) {
          user = verifyToken(token);
        }

        return {
          user,
          loaders: {
            shipment: createShipmentLoader(),
            user: createUserLoader(),
          },
        };
      },
    })
  );

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🏥 Health check at http://localhost:${PORT}/health`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
