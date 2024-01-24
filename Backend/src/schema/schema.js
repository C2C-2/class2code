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

  input UserInput {
    Username: String!
    FirstName: String!
    LastName: String!
    Email: String!
    Password: String
    Country: String
    IsActive: Boolean
    CreatedBy: Int
    CreateDate: String
    Rate: Float
    DateOfBirth: String
    Gender: String
    Work: String
    Bio: String
    LastTimeOnline: String
  }

  type UserType {
    Username: String!
    FirstName: String!
    LastName: String!
    Email: String!
    Password: String
    Country: String!
    IsActive: Boolean!
    CreatedBy: Int!
    CreateDate: String!
    Rate: Float!
    DateOfBirth: String!
    Gender: String!
    Work: String!
    Bio: String!
    LastTimeOnline: String!
  }

  type Query {
    sendMessage(message: String!, fileName: String!, chatID: Int): AIMessage!
    getAIChat(chatID: Int!): AIChat!
    getOldAIChats(userID: Int!): [AIChat!]!
    logout(userID: Int!): Boolean!
  }

  type Mutation {
    createNewAIChat(userID: Int!): AIChat!
    login(username: String!, password: String!): String
    loginByGoogle(idToken: String!): String
    loginByLinkedin(code: String!): String
    loginByGitHup(code: String!): String
    createNewUser(user: UserInput!): UserType!
    forgetPassword(email: String!): Boolean
  }
`;

module.exports = { typeDefs };
