const { gql } = require("apollo-server");

const typeDefs = gql`
  type AIMessage {
    id: ID
    Question: String!
    Answer: String!
    CreatedDate: String!
  }

  type AIChat {
    id: ID
    CreatedDate: String!
    Messages: [AIMessage!]!
  }

  type Query {
    sendMessage(message: String!, fileName: String!, chatID: Int): AIMessage!
    getAIChat(chatID: Int!): AIChat!
    createNewAIChat(userID: Int!): AIChat!
    getOldAIChats(userID: Int!): [AIChat!]!
  }
`;

module.exports = { typeDefs };
