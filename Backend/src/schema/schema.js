const { gql } = require("apollo-server");

const typeDefs = gql`
  type integer {
    low: Int
    high: Int
  }

  type AIMessage {
    _id: ID
    Question: String
    Answer: String
    CreatedDate: String
  }

  type AIChat {
    _id: ID
    CreatedDate: String
    Messages: [AIMessage]
  }

  type Comment {
    _id: ID
    Value: String
    CreatedDate: String
  }

  type Chat {
    _id: ID
    IsDeleted: Boolean
    CreatedDate: String
  }

  input ChatInput {
    IsDeleted: Boolean
    CreatedDate: String
  }

  type Company {
    _id: ID
    CompanyName: String
    CompanyDescription: String
    Rate: integer
    Domain: String
    IsDeleted: Boolean
    CreateDate: String
  }

  input CompanyInput {
    CompanyName: String
    CompanyDescription: String
    Domain: String
    Rate: Int
  }

  type ContactMessage {
    _id: ID
    Message: String
    CreatedDate: String
  }

  input ContactMessageInput {
    Message: String
  }

  type Education {
    _id: ID
    Title: String
    Description: String
    FileName: String
  }

  type Message {
    _id: ID
    userId: Int
    MessageContent: String
    CreatedDate: String
    IsDeleted: Boolean
  }

  input MessageInput {
    userId: Int
    MessageContent: String
  }

  type PositionPost {
    _id: ID
    Content: String
    CreatedDate: String
    IsDeleted: Boolean
  }

  input PositionPostInput {
    Content: String
  }

  type Project {
    _id: ID
    ProjectName: String
    ProjectDescription: String
    FileName: String
  }

  input ProjectInput {
    ProjectName: String
    ProjectDescription: String
    FileName: String
  }

  type ProjectNoteTask {
    _id: ID
    Title: String
    Description: String
  }

  input ProjectNoteTaskInput {
    Title: String
    Description: String
  }

  type ProjectNote {
    _id: ID
    Title: String
    Tasks: [ProjectNoteTask]
  }

  input ProjectNoteInput {
    Title: String
  }

  type ProjectRequirement {
    _id: ID
    Value: String
  }

  type Skill {
    _id: ID
    Skill: String
  }

  input SkillInput {
    Skill: String
  }

  type SocialMediaLink {
    _id: ID
    PlatformName: String
    Link: String
  }

  input SocialMediaLinkInput {
    PlatformName: String
    Link: String
  }

  type Task {
    _id: ID
    TaskName: String
    TaskStatus: String
    StartDate: String
    EndDate: String
    Priority: Int
    Comments: String
    IsMarked: Boolean
    CreateDate: String
  }

  type TaskStep {
    _id: ID
    Description: String
    Number: Int
  }

  type Team {
    _id: ID
    TeamName: String
    IsDeleted: Boolean
    TeamRole: String
    CreateDate: String
  }

  input TeamInput {
    TeamName: String
    IsDeleted: Boolean
    TeamRole: String
    CreateDate: String
  }

  input UserInput {
    Username: String
    FirstName: String
    LastName: String
    Email: String
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
    _id: ID
    Username: String
    FirstName: String
    LastName: String
    Email: String
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
    AIChats: [AIChat]
  }

  type Query {
    getAIChat(chatId: Int!): AIChat
    getOldAIChats(userId: Int!): [AIChat]
    logout(userId: Int!): Boolean
    getUser(userId: Int!): UserType
    deleteTeam(teamId: Int!): Boolean
    deleteCompany(companyId: Int!): Boolean
    deleteSkill(skillId: Int!): Boolean
    getAllUserCompanies(userId: Int!, page: Int, limit: Int): [Company]
    filterMyCompanies(
      userId: Int!
      filterType: String!
      desc: Boolean
      page: Int
      limit: Int
    ): [Company]
    searchInMyCompanies(
      userId: Int!
      word: String!
      page: Int!
      limit: Int!
    ): [Company]
    getAllUserWorksCompanies(userId: Int!, page: Int, limit: Int): [Company]
    filterWorksCompanies(
      userId: Int!
      filterType: String!
      desc: Boolean
      page: Int
      limit: Int
    ): [Company]
    searchInWorksCompanies(
      userId: Int!
      word: String!
      page: Int
      limit: Int
    ): [Company]
    getProjectNotes(projectId: Int!): ProjectNote
    getProfileStatistics(userId: Int!): UserType
    getUserSkills(userId: Int!): [Skill]
    getUserSocialMediaAccounts(userId: Int!): [SocialMediaLink]
    deleteSocialMediaAccounts(id: Int!): Boolean
  }

  type Mutation {
    sendAIMessage(message: String!, fileName: String!, chatId: Int!): AIMessage
    createNewAIChat(userId: Int!): AIChat
    createNewUser(user: UserInput!): UserType
    forgetPassword(email: String!): Boolean
    updateUser(userId: Int!, user: UserInput!): UserType
    createNewProject(project: ProjectInput!): Project
    createNewTeam(team: TeamInput!, companyId: Int!): Team
    createNewChat(userId: Int!, chat: ChatInput!): Chat
    sendMessage(message: MessageInput!, chatId: Int!): Message
    createNewCompany(company: CompanyInput!, userId: Int!): Company
    createNewSkill(skill: SkillInput!, userId: Int!): Skill
    createNewContactMessage(
      contactMessage: ContactMessageInput!
      userId: Int!
    ): ContactMessage
    createPositionPost(post: PositionPostInput!, companyId: Int!): PositionPost
    addUserToTeam(teamId: Int!, userId: Int!, role: String!): Boolean
    createProjectNote(
      projectNote: ProjectNoteInput!
      projectId: Int!
    ): ProjectNote
    createProjectNoteTask(
      projectNoteTask: ProjectNoteTaskInput!
      projectNoteId: Int!
    ): ProjectNoteTask
    createNewSocialMediaLink(
      socialMediaAccount: SocialMediaLinkInput!
      userId: Int!
    ): SocialMediaLink
  }
`;

module.exports = { typeDefs };
