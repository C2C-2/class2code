require("express-async-errors");
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const compression = require("compression");
const cors = require("cors");
const { typeDefs } = require("./src/schema/schema");
const { resolvers } = require("./src/controllers/resolvers");
const Variables = require("./src/config/Variables");

const PORT = 3000;

const app = express();
app.use(compression());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
