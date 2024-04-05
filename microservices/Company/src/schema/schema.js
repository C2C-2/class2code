const { gql } = require("apollo-server");

const typeDefs = gql`
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

  input CommentInput {
    Value: String!
    CreatedDate: String
  }

  type Chat {
    _id: ID
    CreatedDate: String
    Messages: [Message]
  }

  input ChatInput {
    CreatedDate: String
  }

  type Company {
    _id: ID
    CompanyName: String
    CompanyDescription: String
    Rate: Float
    Domain: String
    CreateDate: String
    Teams: [Team]
    Project: Project
    Comments: [Comment]
    Posts: [PositionPost]
    Tasks: [Task]
  }

  input CompanyInput {
    CompanyName: String!
    CompanyDescription: String!
    Domain: String!
    Rate: Float
  }

  type ContactMessage {
    _id: ID
    Message: String
    CreatedDate: String
  }

  input ContactMessageInput {
    Message: String!
  }

  type Education {
    _id: ID
    Title: String
    Description: String
    FileName: String
  }

  input EducationInput {
    Title: String
    Description: String
    FileName: String
  }

  type Message {
    _id: ID
    userId: Int
    MessageContent: String
    CreatedDate: String
  }

  input MessageInput {
    userId: Int!
    MessageContent: String!
  }

  type PositionPost {
    _id: ID
    Content: String
    CreatedDate: String
  }

  input PositionPostInput {
    Content: String!
  }

  type Project {
    _id: ID
    ProjectName: String
    ProjectDescription: String
    FileName: String
    Notes: [ProjectNote]
    Requirements: [ProjectRequirement]
    Applies: [Company]
  }

  input ProjectInput {
    ProjectName: String!
    ProjectDescription: String!
    FileName: String!
  }

  type ProjectNoteTask {
    _id: ID
    Title: String
    Description: String
  }

  input ProjectNoteTaskInput {
    Title: String!
    Description: String!
  }

  type ProjectNote {
    _id: ID
    Title: String
    Tasks: [ProjectNoteTask]
  }

  input ProjectNoteInput {
    Title: String!
  }

  type ProjectRequirement {
    _id: ID
    Value: String
  }

  input ProjectRequirementInput {
    Value: String!
  }

  type Skill {
    _id: ID
    Skill: String
  }

  input SkillInput {
    Skill: String!
  }

  type SocialMediaLink {
    _id: ID
    PlatformName: String
    Link: String
  }

  input SocialMediaLinkInput {
    PlatformName: String!
    Link: String!
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
    Steps: [TaskStep]
  }

  input TaskInput {
    TaskName: String!
    TaskStatus: String!
    StartDate: String!
    EndDate: String!
    Priority: Int!
    Comments: String!
    IsMarked: Boolean
    CreateDate: String
  }

  type TaskStep {
    _id: ID
    Description: String
    Number: Int
  }

  input TaskStepInput {
    Description: String!
    Number: Int!
  }

  type Team {
    _id: ID
    TeamName: String
    TeamRole: String
    CreateDate: String
    Tasks: [Task]
    Members: [User]
  }

  input TeamInput {
    TeamName: String!
    TeamRole: String!
    CreateDate: String
  }

  input UserInput {
    Username: String!
    FirstName: String!
    LastName: String!
    Email: String!
    Password: String!
    Country: String!
    IsActive: Boolean
    CreatedBy: Int!
    CreateDate: String
    Rate: Float!
    DateOfBirth: String!
    Gender: String!
    Work: String!
    Bio: String!
    LastTimeOnline: String
  }

  type User {
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
    MyCompanies: [Company]
    WorkCompanies: [Company]
    Skills: [Skill]
    Accounts: [SocialMediaLink]
    Tasks: [Task]
    Posts: [PositionPost]
    Chats: [Chat]
    Educations: [Education]
    AIChats: [AIChat]
    Friends: [User]
    CreatedTasks: [Task]
  }

  type Team {
    _id: ID
    TeamName: String
    TeamRole: String
    CreateDate: String
    Tasks: [Task]
    Members: [User]
  }

  input TeamInput {
    TeamName: String!
    TeamRole: String!
    CreateDate: String
  }

  type Query {
    deleteTeam(teamId: Int!): Boolean
    deleteCompany(companyId: Int!, userId: Int!): Boolean
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
    getCompany(companyId: Int!): Company
    getAllPosts(userId: Int!, page: Int, limit: Int): [PositionPost]
    searchInPositionPosts(
      page: Int
      limit: Int
      word: String!
      userId: Int!
    ): [PositionPost]
    getAllPostsSortedByDate(
      page: Int
      limit: Int
      isDESC: Boolean!
      userId: Int!
    ): [PositionPost]
    searchInMyPosts(
      page: Int
      limit: Int
      word: String!
      userId: Int!
    ): [PositionPost]
    getAllMyPostsSortedByDate(
      page: Int
      limit: Int
      isDESC: Boolean!
      userId: Int!
    ): [PositionPost]
    getTeam(teamId: Int!): Team
    deleteUserFromTeam(userId: Int!, teamId: Int!): Boolean
    deletePost(postId: Int!, userId: Int!): Boolean
    deleteCompanyComment(commentId: Int!): Boolean
  }

  type Mutation {
    createNewTeam(team: TeamInput!, companyId: Int!): Team
    createNewCompany(company: CompanyInput!, userId: Int!): Company
    createPositionPost(
      post: PositionPostInput!
      companyId: Int!
      userId: Int!
    ): PositionPost
    addUserToTeam(teamId: Int!, userId: Int!, role: String!): Boolean
    createCompanyComment(comment: CommentInput!, companyId: Int!): Comment
    updateCompany(
      companyId: Int!
      company: CompanyInput!
      userId: Int!
    ): Company
    updatePositionPost(
      positionPostId: Int!
      positionPost: PositionPostInput!
      userId: Int!
    ): PositionPost
    applyToPost(postId: Int!, userId: Int!): Boolean
    applyForProject(projectId: Int!, companyId: Int!): Boolean
    updateTeam(teamId: Int!, team: TeamInput!): Team
  }
`;

module.exports = { typeDefs };
