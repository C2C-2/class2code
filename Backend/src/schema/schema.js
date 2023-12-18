const { gql } = require("apollo-server");

const typeDefs = gql`
  type AIMessage {
    id: ID!
    Question: String!
    Answer: String!
    CreatedDate: String!
  }

  type Query {
    sendMessage(message: String!, fileName: String!, chatId: Int): AIMessage
  }
`;

module.exports = { typeDefs };
