const { gql } = require("apollo-server");

const typeDefs = gql`
  type AIMessage {
    response: String
  }

  type Query {
    AIMessage(message: String!): AIMessage
  }
`;

module.exports = { typeDefs };
