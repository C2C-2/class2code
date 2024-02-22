/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable indent */
const axios = require("axios");
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Tokens = require("../mysqlModels/Tokens");

const myEmail = "202007723@bethlehem.edu";

const transporter = nodemailer.createTransport({
  service: "gmail", // Update with your email service provider (e.g., 'gmail', 'yahoo', etc.)
  auth: {
    user: myEmail, // Update with your email address
    pass: process.env.EMAIL_PASSWORD, // Update with your email password or an app-specific password
  },
});

/* this library to sync entity with data base, so with this library I can
use models to define schema for database objects and manage it without use
queries.

for example I use NeodeObject.create(model, object) to create object.
*/
const NeodeObject = require("../config/NeodeObject");

// this file save all global variables like urls
// it return module (javascript object)
const Variables = require("../config/Variables");

const resolvers = {
  Query: {
    /**
     * Retrieves the AI chat with the specified chat ID.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object.
     * @param {string} args.chatId - The ID of the chat.
     * @return {Object} - The AI chat object with the specified chat ID.
     * @throws {Error} - If the chatId is null or if the chat is not found.
     */
    getAIChat: async (parent, args) => {
      try {
        const { chatId } = args;

        if (!chatId) {
          throw new Error("ChatID is null");
        }

        // this query get chat by chatId with all messages.
        const cypherQuery =
          "MATCH (chat:AIChat)-[:HAS_A]->(message:AIMessage) WHERE ID(chat) = $chatId RETURN chat, collect(message) as messages";
        const result = await NeodeObject.cypher(cypherQuery, { chatId });

        if (result.records.length === 0) {
          throw new Error("Chat not found");
        }

        return {
          ...result.records[0].get("chat").properties,
          id: chatId,
          Messages: result.records[0]
            .get("messages")
            .map((message) => message.properties),
        };
      } catch (error) {
        console.error("Error fetching AIChat:", error.message);
        throw error;
      }
    },
    /**
     * A function that handles the logout process.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId
     * @return {Boolean} Returns true if the logout is successful, false otherwise
     */
    logout: async (parent, args) => {
      try {
        const { userId } = args;

        if (userId === null) {
          throw new Error(
            `Are you send userId? UserID is required, userId value is ${userId}. please check userId value before send`
          );
        }

        await Tokens.destroy({
          where: {
            userId,
          },
        }).catch(() => {
          throw new Error("something wrong in system please try again");
        });

        return true;
      } catch (error) {
        console.error("Error in logout resolver:", error.message);
        return false;
      }
    },
    /**
     * Asynchronous function to retrieve user data based on user ID.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId
     * @return {Object} The user data and AI chat history
     */
    getUser: async (parent, args) => {
      try {
        // this int args from client with user id value
        const { userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? UserID is required, userId value is ${userId}. please check userId value before send`
          );
        }
        const result = await NeodeObject.findById("User", userId);

        if (!result) {
          throw new Error("User not found");
        }

        return result.toJson();
      } catch (error) {
        console.error("Error in getUser resolver:", error.message);
      }
    },
    /**
     * A function to delete a team.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object with teamId
     * @return {Promise} a promise that resolves to the deleted team
     */
    deleteTeam: async (parent, args) => {
      try {
        const { teamId } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        const team = await NeodeObject?.findById("Team", teamId);

        if (!team) {
          throw new Error("Team not found");
        }
        return await team.delete();
      } catch (error) {
        console.error("Error in deleteTeam resolver:", error.message);
      }
    },
    /**
     * A function to delete a company.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object
     * @param {string} args.companyId - The ID of the company to be deleted
     * @return {Promise<Object>} A Promise that resolves to the deleted company object
     */
    deleteCompany: async (parent, args) => {
      try {
        // int args from client
        const { companyId } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        await company.delete();

        return true;
      } catch (error) {
        console.error("Error in deleteCompany resolver:", error.message);
        return false;
      }
    },
    /**
     * Delete a skill by its ID.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing skillId
     * @return {Promise} A Promise that resolves to the deleted skill
     */
    deleteSkill: async (parent, args) => {
      try {
        // int args from client
        const { skillId } = args;

        if (!skillId) {
          throw new Error(
            `Are you send skillId? skillId is required, skillId value is ${skillId}. please check skillId value before send`
          );
        }

        // return skill object.
        const skill = await NeodeObject?.findById("Skill", skillId);

        if (!skill) {
          throw new Error("Skill not found");
        }

        await skill.delete();
        return true;
      } catch (error) {
        console.error("Error in deleteSkill resolver:", error.message);
        return false;
      }
    },
    /**
     * A function to get all companies associated with a user.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId
     * @return {Array} An array of companies associated with the user
     */
    getAllUserCompanies: async (parent, args) => {
      try {
        const { userId, page = 0, limit = 6 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.cypher(
          `
          MATCH (user:User) -[r:ADMIN_OF]-> (company:Company) where ID(user) = $userId return user,r,company
          `,
          { userId }
        );

        if (!user) {
          throw new Error("User not found");
        }

        return user.records
          .map((record) => ({
            _id: `${record.get("company").identity}`,
            ...record.get("company").properties,
          }))
          .slice((page - 1) * limit, limit);
      } catch (error) {
        console.error("Error in getAllUserCompanies resolver:", error.message);
      }
    },
    /**
     * Asynchronously filters companies based on user ID, filter type, and sorting order.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId {int},
     *  filterType {string: Rate, CreatedDate}, and desc {boolean: witch mean is desc order or not}
     * @return {Array} An array of filtered companies
     */
    filterMyCompanies: async (parent, args) => {
      try {
        const {
          userId,
          filterType = "CreatedDate",
          desc = false,
          page = 0,
          limit = 6,
        } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        // this query filter companies on Neo4j database
        // its return object of 2 value {records: array of result objects, summary}
        const companies = await NeodeObject?.cypher(
          `MATCH (user:User) -[r:ADMIN_OF]-> (companies:Company) return companies ORDER BY companies.${filterType} ${
            desc ? "desc" : "asc"
          }`
        );

        // I make map because result is not as a schema type.
        return companies.records
          .map((record) => ({
            ...record.get("companies").properties,
            _id: `${record.get("companies").identity}`,
          }))
          .slice((page - 1) * limit, limit);
      } catch (error) {
        console.error("Error in filterMyCompanies resolver:", error.message);
      }
    },
    /**
     * Async function to search for companies based on user ID, search
     * word, and pagination parameters.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId, word, page, and limit
     * @return {Array} An array of companies based on the search criteria and pagination
     */
    searchInMyCompanies: async (parent, args) => {
      try {
        // eslint-disable-next-line object-curly-newline
        const { userId, word = "", page = 0, limit = 6 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const companies = await NeodeObject?.cypher(
          `MATCH (user:User) -[r:ADMIN_OF]-> (companies:Company) where Id(user) = ${userId} 
          AND (companies.CompanyDescription CONTAINS '${word}' 
          OR companies.CompanyName CONTAINS '${word}'
          OR companies.Domain CONTAINS '${word}') return companies`
        );

        return companies.records
          .map((record) => ({
            ...record.get("companies").properties,
            _id: `${record.get("companies").identity}`,
          }))
          .slice((page - 1) * limit, limit);
      } catch (error) {
        console.error("Error in searchInMyCompanies resolver:", error.message);
      }
    },
    getAllUserWorksCompanies: async (parent, args) => {
      try {
        const { userId, page = 0, limit = 6 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const companies = await NeodeObject?.cypher(
          `
          MATCH (u:User) - [:IN_TEAM] -> (t:Team) WHERE ID(u) = $userId
          MATCH (c:Company) -[:has_a_team]-> (t) RETURN c
          `,
          { userId }
        );

        if (!companies) {
          throw new Error("User not found");
        }

        return companies.records
          .map((record) => ({
            _id: `${record.get("c").identity}`,
            ...record.get("c").properties,
          }))
          .slice((page - 1) * limit, limit);
      } catch (error) {
        console.error("Error in getAllUserCompanies resolver:", error.message);
      }
    },
    filterWorksCompanies: async (parent, args) => {
      try {
        const {
          userId,
          filterType = "CreatedDate",
          desc = false,
          page = 0,
          limit = 6,
        } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const companies = await NeodeObject?.cypher(
          `
          MATCH (u:User) - [:IN_TEAM] -> (t:Team) WHERE ID(u) = $userId
          MATCH (c:Company) -[:has_a_team]-> (t) RETURN c ORDER BY companies.${filterType} ${
            // eslint-disable-next-line indent
            desc ? "desc" : "asc"
            // eslint-disable-next-line indent
          }
          `,
          { userId }
        );

        // I make map because result is not as a schema type.
        return companies.records
          .map((record) => ({
            ...record.get("c").properties,
            _id: `${record.get("c").identity}`,
          }))
          .slice((page - 1) * limit, limit);
      } catch (error) {
        console.error("Error in filterMyCompanies resolver:", error.message);
      }
    },
    searchInWorksCompanies: async (parent, args) => {
      try {
        // eslint-disable-next-line object-curly-newline
        const { userId, word = "", page = 0, limit = 6 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const companies = await NeodeObject?.cypher(
          `
          MATCH (u:User) - [:IN_TEAM] -> (t:Team) WHERE ID(u) = $userId
          MATCH (c:Company) -[:has_a_team]-> (t) where 
          companies.CompanyDescription CONTAINS '${word}' 
          OR companies.CompanyName CONTAINS '${word}'
          OR companies.Domain CONTAINS '${word}' 
          RETURN c
          `,
          { userId }
        );

        return companies.records
          .map((record) => ({
            ...record.get("c").properties,
            _id: `${record.get("c").identity}`,
          }))
          .slice((page - 1) * limit, limit);
      } catch (error) {
        console.error("Error in searchInMyCompanies resolver:", error.message);
      }
    },
    getProjectNotes: async (parent, args) => {
      try {
        const { projectId } = args;

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        const notes = await NeodeObject?.cypher(
          ` 
          MATCH (p:Project) - [:HAS_NOTE] -> (n:ProjectNote) WHERE ID(p) = $projectId
          MATCH (n) - [:HAS_TASK] -> (t:ProjectNoteTask)
          RETURN n, t`,
          { projectId }
        );

        return {
          ...notes.records[0].get("n").properties,
          _id: `${notes.records[0].get("n").identity}`,
          Tasks: notes.records.map((record) => ({
            _id: `${record.get("t").identity}`,
            ...record.get("t").properties,
          })),
        };
      } catch (error) {
        console.error("Error in getProjectNotes resolver:", error.message);
      }
    },
    getProfileStatistics: async (parent, args) => {
      try {
        const { userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        // ## user enroll project after finishing the project in company.
        // where all users get the project points.
        const numberOfProjects = await NeodeObject?.cypher(
          `
          MATCH (u:User) -[:WORK_ON]-> (p:Project) WHERE ID(u) = $userId
          RETURN count(p)
          `
        );

        const numberOfTeams = await NeodeObject?.cypher(
          `
          MATCH (u:User) -[:IN_TEAM]-> (t:Team) WHERE ID(u) = $userId
          RETURN count(t)
          `
        );

        const numberOfTasks = await NeodeObject?.cypher(
          `
          MATCH (u:User) -[:HAS_A_TASK]-> (t:Task) WHERE ID(u) = $userId
          RETURN count(t)
          `
        );

        return {
          numberOfProjects: numberOfProjects.records[0].get("count(p)"),
          numberOfTeams: numberOfTeams.records[0].get("count(t)"),
          numberOfTasks: numberOfTasks.records[0].get("count(t)"),
        };
      } catch (error) {
        console.error("Error in getProfileInfo resolver:", error.message);
      }
    },
    getUserSkills: async (parent, args) => {
      try {
        const { userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const skills = await NeodeObject?.cypher(
          `
          MATCH (u:User) -[:HAS_A_SKILL]-> (s:Skill) WHERE ID(u) = $userId
          RETURN s
          `
        );

        return skills.records.map((record) => ({
          ...record.get("s").properties,
          _id: `${record.get("s").identity}`,
        }));
      } catch (error) {
        console.error("Error in getUserSkills resolver:", error.message);
      }
    },
    getUserSocialMediaAccounts: async (parent, args) => {
      try {
        const { userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const socialMediaAccounts = await NeodeObject?.cypher(
          `
          MATCH (u:User) -[:HAS_A_SOCIAL_MEDIA]-> (s:SocialMediaAccount) WHERE ID(u) = $userId
          RETURN s
          `
        );

        return socialMediaAccounts.records.map((record) => ({
          ...record.get("s").properties,
          _id: `${record.get("s").identity}`,
        }));
      } catch (error) {
        console.error(
          "Error in getUserSocialMediaAccounts resolver:",
          error.message
        );
      }
    },
    deleteSocialMediaAccounts: async (parent, args) => {
      try {
        const { id } = args;

        if (!id) {
          throw new Error(
            `Are you send socialMediaId? socialMediaId is required, socialMediaId value is ${id}. please check socialMediaId value before send`
          );
        }

        // return skill object.
        const account = await NeodeObject?.findById("SocialMediaLink", id);

        if (!account) {
          throw new Error("Skill not found");
        }

        await account.delete();
        return true;
      } catch (error) {
        console.error(
          "Error in deleteUserSocialMediaAccounts resolver:",
          error.message
        );
        return false;
      }
    },
    getProjects: async (parent, args) => {
      try {
        const { page = 0, limit = 6 } = args;

        const allProjects = await NeodeObject?.all("Project");

        return allProjects
          .toJson()
          .then((e) => e.slice(page * limit, (page + 1) * limit));
      } catch (error) {
        console.error("Error in getProjects resolver:", error.message);
      }
    },
    getProjectRequirements: async (parent, args) => {
      try {
        const { projectId } = args;

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        const project = await NeodeObject?.cypher(
          ` MATCH (p:Project) -[:HAS_REQUIREMENT] -> (r:ProjectRequirement) 
            WHERE ID(p) = $projectId
            RETURN r
          `,
          { projectId }
        );

        return project.records.map((record) => ({
          ...record.get("r").properties,
          _id: `${record.get("r").identity}`,
        }));
      } catch (error) {
        console.error("Error in getProjects resolver:", error.message);
      }
    },
    getProjectApplies: async (parent, args) => {
      try {
        const { projectId } = args;

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        const numberOfApplies = await NeodeObject?.cypher(
          ` MATCH (c:Company) -[:TAKE_A_PROJECT] -> (p:Project) 
            WHERE ID(p) = $projectId
            RETURN count(c) as numberOfApplies
          `,
          { projectId }
        );

        return numberOfApplies.records[0].get("numberOfApplies");
      } catch (error) {
        console.error("Error in getProjects resolver:", error.message);
      }
    },
    searchInProjects: async (parent, args) => {
      try {
        const { word, page = 0, limit = 6 } = args;

        if (!word) {
          throw new Error(
            `Are you send word? word is required, word value is ${word}. please check word value before send`
          );
        }

        const projects = await NeodeObject?.cypher(
          ` MATCH (p:Project) 
            WHERE p.ProjectName CONTAINS $word
            WHERE p.ProjectDescription CONTAINS $word
            RETURN p
          `,
          { word }
        );

        return projects.records
          .map((record) => ({
            ...record.get("p").properties,
            _id: `${record.get("p").identity}`,
          }))
          .slice(page * limit, (page + 1) * limit);
      } catch (error) {
        console.error("Error in getProjects resolver:", error.message);
      }
    },
    applyForProject: async (parent, args) => {
      try {
        const { projectId, companyId } = args;

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const project = await NeodeObject?.findById("Project", projectId);

        if (!project) {
          throw new Error("Project not found");
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        await company.relateTo(project, "TAKE_A_PROJECT");

        return true;
      } catch (error) {
        console.error("Error in getProjects resolver:", error.message);
        return false;
      }
    },
    getTask: async (parent, args) => {
      try {
        const { taskId } = args;

        if (!taskId) {
          throw new Error(
            `Are you send taskId? taskId is required, taskId value is ${taskId}. please check taskId value before send`
          );
        }

        const task = await NeodeObject?.findById("Task", taskId);
        const taskSteps = await NeodeObject?.cypher(
          `MATCH (t:Task) -[:HAS_A] -> (ts:TaskStep)
           WHERE ID(t) = $taskId
           RETURN ts
          `,
          { taskId }
        );

        return {
          ...task?.properties,
          _id: `${task?.identity}`,
          TaskSteps: taskSteps.records.map((record) => ({
            ...record.get("ts").properties,
            _id: `${record.get("ts").identity}`,
          })),
        };
      } catch (error) {
        console.error("Error in getTask resolver:", error.message);
      }
    },
  },
  Mutation: {
    /* this to send message to AI module and get answer about a project from
    it file */
    sendAIMessage: async (parent, args) => {
      try {
        // this used to basic auth in python backend (AI model)
        const username = process.env.AI_USERNAME;
        const password = process.env.AI_PASSWORD;
        const credentials = `${username}:${password}`;

        // this string args from frontend as parameters to AI chat
        const { message } = args;

        // ########################################################
        // this will be change after create team object to Team ID so
        // we get company then project then file name from project
        const { fileName } = args;
        // ########################################################

        // this int args from to check if chat already exist or create new
        const { chatId } = args;

        if (message === null || fileName === null) {
          throw new Error("Message or fileName is null");
        }

        // Base64 encode the credentials
        // this step required to send username & password to auth
        const encodedCredentials = base64.encode(credentials);

        // this to get answer from AI model about some question
        // return type is string
        const response = await axios.post(
          Variables.pythonLink,
          { query: message, filename: fileName },
          {
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Create AIChat and AIMessage nodes
        // I save it in database to get it when user need it from old chats
        const [chat, createdMessage] = await Promise.all([
          chatId
            ? NeodeObject.findById("AIChat", chatId)
            : NeodeObject.create("AIChat", {}),
          NeodeObject.create("AIMessage", {
            Question: message,
            Answer: response.data,
          }),
        ]);

        if (chat === null || createdMessage === null) {
          throw new Error("Chat or createdMessage is null");
        }

        // Relate AIMessage to AIChat
        await chat.relateTo(createdMessage, "has_a");

        return {
          id: createdMessage.identity().toString(),
          ...createdMessage.properties(),
        };
      } catch (error) {
        console.error("Error in sendMessage resolver:", error.message);
        throw new Error("An error occurred while processing the request");
      }
    },
    /**
     * Creates a new AI chat.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object.
     * @param {string} args.userId - The ID of the user.
     * @return {Object} The newly created AI chat object.
     */
    createNewAIChat: async (parent, args) => {
      try {
        // this int args from client with user id value to create new AI chat.
        const { userId } = args;

        if (userId === null) {
          throw new Error("UserID is null");
        }

        const [AIChat, User] = await Promise.all([
          NeodeObject?.create("AIChat", {}),
          NeodeObject?.findById("User", userId),
        ]);

        if (User === false) {
          NeodeObject?.delete(AIChat);
          throw new Error("User not found");
        }

        // Relate AIChat to User
        await User.relateTo(AIChat, "chat_with_AI");

        return AIChat.toJson();
      } catch (error) {
        console.error("Error in createNewAIChat resolver:", error.message);
        throw new Error("An error occurred while processing the request");
      }
    },
    /**
     * Asynchronous function to create a new user.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object containing user information.
     * @return {Object} The newly created user object.
     */
    createNewUser: async (parent, args) => {
      try {
        const { user } = args;

        if (!user) {
          throw new Error(
            `Are you send user? user is required, user value is ${user}. please check user value before send`
          );
        }

        const newUser = {
          ...user,
          Password: bcrypt.hashSync(user.Password, 10),
        };

        let User = NeodeObject?.create("User", newUser);

        if (User === false) {
          User = NeodeObject?.create("User", newUser);

          if (User === false) {
            throw new Error("something wrong in system please try again");
          }
        }

        return User.toJson();
      } catch (error) {
        throw new Error("An error occurred while processing the request");
      }
    },
    /**
     * This function handles the process of forgetting a user's password.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing the user's email
     * @return {string} A message indicating the success of the password reset email sending process
     */
    forgetPassword: async (parent, args) => {
      try {
        const { email } = args;

        if (!email) {
          throw new Error("Email is required");
        }

        const [User] = await Promise.all([
          NeodeObject?.first("User", { Email: email }),
        ]);

        if (!User) {
          throw new Error("User not found, please register first");
        }

        // Generate a temporary password or a reset token (depending on your workflow)
        const temporaryPassword = "123456"; // Implement this function

        // Send a password reset email
        const mailOptions = {
          from: myEmail, // Update with your email address
          to: email,
          subject: "Password Reset Request",
          text: `Your code is: ${temporaryPassword}`,
        };

        await transporter.sendMail(mailOptions);

        return "Password reset email sent successfully";
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * A function to create a new project.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing the project
     * @return {Object} The newly created project
     */
    createNewProject: async (parent, args) => {
      try {
        const { project, requirements } = args;

        if (!project) {
          throw new Error(
            `Are you send project? project is required, project value is ${project}. please check project value before send`
          );
        }

        const newProject = await NeodeObject?.create("Project", project);

        if (requirements) {
          requirements.foreach(async (requirement) => {
            const newRequirement = await NeodeObject?.create(
              "ProjectRequirement",
              requirement
            );

            await newProject.relateTo(newRequirement, "has_requirement");
          });
        }

        return newProject?.toJson();
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * A function to create a new team.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object containing team and companyId
     * @return {Object} the newly created team object
     */
    createNewTeam: async (parent, args) => {
      try {
        const { team, companyId } = args;

        if (!team) {
          throw new Error(
            "Are you send team? team is required. please check team value before send"
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);
        if (!company) {
          throw new Error("Company not found, please create one first");
        }
        const teamCreated = await NeodeObject?.create("Team", team);
        await company.relateTo(teamCreated, "has_a_team");

        return teamCreated.toJson();
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a new chat.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object with userId and chat
     * @return {Object} the newly created chat in JSON format
     */
    createNewChat: async (parent, args) => {
      try {
        const { userId, chat } = args;

        if (!chat) {
          throw new Error(
            `Are you send chat? chat is required, chat value is ${chat}. please check chat value before send`
          );
        }

        const chatCreated = await NeodeObject?.create("Chat", chat);
        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found, please register first");
        }

        await user.relateTo(chatCreated, "chat_with");

        return chatCreated.toJson();
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously sends a message to a chat, creates the message,
     * relates it to the chat, and returns the created message as JSON.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing message and chatId
     * @return {Object} The created message as JSON
     */
    sendMessage: async (parent, args) => {
      try {
        const { message, chatId } = args;

        if (!message) {
          throw new Error(
            "Are you send message? message is required. please check message value before send"
          );
        }

        const chat = await NeodeObject?.findById("Chat", chatId);

        if (!chat) {
          throw new Error("Chat not found, please create one first");
        }

        const messageCreated = await NeodeObject?.create("Message", message);

        await chat.relateTo(messageCreated, "has_a");

        return messageCreated.toJson();
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a new company.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments containing company and userId
     * @return {Object} the newly created company object
     */
    createNewCompany: async (parent, args) => {
      try {
        const { company, userId } = args;

        if (!company) {
          throw new Error(
            "Are you send company? company is required. please check company value before send"
          );
        }

        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found, please register first");
        }

        const companyCreated = await NeodeObject?.create("Company", company);

        await user.relateTo(companyCreated, "admin_of");

        return companyCreated.toJson();
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Create a new skill for a user.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments containing the skill and userId
     * @return {object} The newly created skill
     */
    createNewSkill: async (parent, args) => {
      try {
        const { skill, userId } = args;

        if (!skill) {
          throw new Error(
            "Are you send skill? skill is required. please check skill value before send"
          );
        }

        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found, please register first");
        }

        const skillCreated = await NeodeObject?.create("Skill", skill);

        await user.relateTo(skillCreated, "has_a_skill");

        return skillCreated.toJson();
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function for creating a new contact message.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing contactMessage and userId
     * @return {Object} The newly created contact message object
     */
    createNewContactMessage: async (parent, args) => {
      try {
        const { contactMessage, userId } = args;

        if (!contactMessage) {
          throw new Error(
            `Are you send contactMessage? contactMessage is required, contactMessage value is ${contactMessage}. please check contactMessage value before send`
          );
        }

        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found, please register first");
        }

        const newContactMessage = await NeodeObject?.create(
          "ContactMessage",
          contactMessage
        );

        await user.relateTo(newContactMessage, "contact_us");

        return newContactMessage.toJson();
      } catch (error) {
        console.error(
          "Error in createNewContactMessage resolver:",
          error.message
        );
      }
    },
    /**
     * Asynchronously creates a position post.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object containing post and companyId
     * @return {Object} the newly created position post as a JSON object
     */
    createPositionPost: async (parent, args) => {
      try {
        const { post, companyId } = args;

        if (!post) {
          throw new Error(
            `Are you send post? post is required, post value is ${post}. please check post value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found, please create one first");
        }

        const newPost = await NeodeObject?.create("PositionPost", post);

        await company.relateTo(newPost, "has_a_post");

        return newPost.toJson();
      } catch (error) {
        console.error("Error in createPositionPost resolver:", error.message);
      }
    },
    addUserToTeam: async (parent, args) => {
      try {
        const { userId, teamId, role } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        await NeodeObject.writeCypher(
          `MATCH (n:User) WHERE ID(n) = $userId
           MATCH (t:Team) WHERE ID(t) = $teamId
           CREATE (n) -[r:IN_TEAM {role: $role}] -> (t)`,
          { userId, teamId, role }
        );

        return true;
      } catch (error) {
        console.error("Error in addUserToTeam resolver:", error.message);
        return false;
      }
    },
    createProjectNote: async (parent, args) => {
      try {
        const { projectNote, projectId } = args;

        if (!projectNote) {
          throw new Error(
            `Are you send projectNote? projectNote is required, projectNote value is ${projectNote}. please check projectNote value before send`
          );
        }

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectNote value is ${projectId}. please check projectId value before send`
          );
        }

        const project = await NeodeObject?.findById("Project", projectId);

        if (!project) {
          throw new Error("Project not found");
        }

        const newProjectNote = await NeodeObject?.create(
          "ProjectNote",
          projectNote
        );

        await project.relateTo(newProjectNote, "has_note");

        return newProjectNote.toJson();
      } catch (error) {
        console.error("Error in createProjectNote resolver:", error.message);
      }
    },
    createProjectNoteTask: async (parent, args) => {
      try {
        const { projectNoteTask, projectNoteId } = args;

        if (!projectNoteTask) {
          throw new Error(
            `Are you send projectNoteTask? projectNoteTask is required, projectNoteTask value is ${projectNoteTask}. please check projectNoteTask value before send`
          );
        }

        if (!projectNoteId) {
          throw new Error(
            `Are you send projectNoteId? projectNoteId is required, projectNoteId value is ${projectNoteId}. please check projectNoteId value before send`
          );
        }

        const projectNote = await NeodeObject?.findById(
          "ProjectNote",
          projectNoteId
        );

        if (!projectNote) {
          throw new Error("ProjectNote not found");
        }

        const newProjectNoteTask = await NeodeObject?.create(
          "ProjectNoteTask",
          projectNoteTask
        );

        await projectNote.relateTo(newProjectNoteTask, "has_task");

        return newProjectNoteTask.toJson();
      } catch (error) {
        console.error(
          "Error in createProjectNoteTask resolver:",
          error.message
        );
      }
    },
    createNewSocialMediaLink: async (parent, args) => {
      try {
        const { socialMediaAccount, userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found");
        }

        const newSocialMediaLink = await NeodeObject?.create(
          "SocialMediaLink",
          socialMediaAccount
        );

        await user.relateTo(newSocialMediaLink, "has_a_social_media");

        return newSocialMediaLink.toJson();
      } catch (error) {
        console.error(
          "Error in createNewSocialMediaLink resolver:",
          error.message
        );
      }
    },
    createTaskForUser: async (parent, args) => {
      try {
        const { task, userId, userCreateTaskId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found");
        }

        const newTask = await NeodeObject?.create("Task", task);

        if (!userCreateTaskId) {
          throw new Error(
            `Are you send userCreateTaskId? userCreateTaskId is required, userCreateTaskId value is ${userCreateTaskId}. please check userCreateTaskId value before send`
          );
        }

        const userCreateTask = await NeodeObject?.findById(
          "User",
          userCreateTaskId
        );

        if (!userCreateTask) {
          throw new Error("User need to Create Task is not found");
        }

        await userCreateTask.relateTo(newTask, "create_task");

        await user.relateTo(newTask, "has_a_task");

        return newTask.toJson();
      } catch (error) {
        console.error("Error in createTaskForUser resolver:", error.message);
      }
    },
    createTaskForTeam: async (parent, args) => {
      try {
        const { task, teamId, userId } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const team = await NeodeObject?.findById("Team", teamId);

        if (!team) {
          throw new Error("Team not found");
        }

        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found");
        }

        const newTask = await NeodeObject?.create("Task", task);

        await team.relateTo(newTask, "has_a_task");

        await user.relateTo(newTask, "create_task");
      } catch (error) {
        console.error("Error in createTaskForTeam resolver:", error.message);
      }
    },
    updateTask: async (parent, args) => {
      try {
        const { taskId, task } = args;

        if (!taskId) {
          throw new Error(
            `Are you send taskId? taskId is required, taskId value is ${taskId}. please check taskId value before send`
          );
        }
        const updatedTask = await NeodeObject?.findById("Task", taskId).then(
          (t) => t.update(task)
        );

        console.log(updatedTask.toJson());

        return updatedTask.toJson();
      } catch (error) {
        console.error("Error in updateTask resolver:", error.message);
      }
    },
  },
};

module.exports = { resolvers };
