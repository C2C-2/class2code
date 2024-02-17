const axios = require("axios");
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const Tokens = require("../mysqlModels/Tokens");
const nodemailer = require("nodemailer");

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
    /* this to send message to AI module and get answer about a project from
    it file */
    sendMessage: async (parent, args) => {
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
    getUser: async (parent, args) => {
      try {
        // this int args from client with user id value
        const { userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? UserID is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const cypherQuery =
          "MATCH (user:User) - [:CHAT_WITH_AI]-> (chats:AIChat) WHERE ID(user) = $userId RETURN user, chats";
        const result = await NeodeObject.cypher(cypherQuery, { userId });

        if (result.records.length === 0) {
          throw new Error("User not found");
        }

        return {
          ...result?.records[0]?.get("user").properties,
          id: userId,
          AIChats: result?.records?.map(
            (record) => record?.get("chats")?.properties
          ),
        };
      } catch (error) {
        console.error("Error in getUser resolver:", error.message);
      }
    },

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

    deleteCompany: async (parent, args) => {
      try {
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

        return await company.delete();
      } catch (error) {
        console.error("Error in deleteCompany resolver:", error.message);
      }
    },
    deleteSkill: async (parent, args) => {
      try {
        const { skillId } = args;

        if (!skillId) {
          throw new Error(
            `Are you send skillId? skillId is required, skillId value is ${skillId}. please check skillId value before send`
          );
        }

        const skill = await NeodeObject?.findById("Skill", skillId);

        if (!skill) {
          throw new Error("Skill not found");
        }

        return await skill.delete();
      } catch (error) {
        console.error("Error in deleteSkill resolver:", error.message);
      }
    },
  },
  Mutation: {
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
    createNewProject: async (parent, args) => {
      try {
        const { project } = args;

        if (!project) {
          throw new Error(
            `Are you send project? project is required, project value is ${project}. please check project value before send`
          );
        }

        return (await NeodeObject?.create("Project", project)).toJson();
      } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
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
  },
};

module.exports = { resolvers };
