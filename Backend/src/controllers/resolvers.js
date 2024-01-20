const axios = require("axios");
const base64 = require("base-64");

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
        const { chatID } = args;

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
          chatID
            ? NeodeObject.findById("AIChat", chatID)
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
     * @param {string} args.chatID - The ID of the chat.
     * @return {Object} - The AI chat object with the specified chat ID.
     * @throws {Error} - If the chatID is null or if the chat is not found.
     */
    getAIChat: async (parent, args) => {
      try {
        const { chatID } = args;

        if (chatID === null) {
          throw new Error("ChatID is null");
        }

        // this query get chat by chatID with all messages.
        const cypherQuery =
          "MATCH (chat:AIChat)-[:HAS_A]->(message:AIMessage) WHERE ID(chat) = $chatID RETURN chat, collect(message) as messages";
        const result = await NeodeObject.cypher(cypherQuery, { chatID });

        if (result.records.length === 0) {
          throw new Error("Chat not found");
        }

        return {
          ...result.records[0].get("chat").properties,
          id: chatID,
          Messages: result.records[0]
            .get("messages")
            .map((message) => message.properties),
        };
      } catch (error) {
        console.error("Error fetching AIChat:", error.message);
        throw error;
      }
    },
  },
  Mutation: {
    /**
     * Creates a new AI chat.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object.
     * @param {string} args.userID - The ID of the user.
     * @return {Object} The newly created AI chat object.
     */
    createNewAIChat: async (parent, args) => {
      try {
        // this int args from client with user id value to create new AI chat.
        const { userID } = args;

        if (userID === null) {
          throw new Error("UserID is null");
        }

        const [AIChat, User] = await Promise.all([
          NeodeObject?.create("AIChat", {}),
          NeodeObject?.findById("User", userID),
        ]);

        if (User === false) {
          NeodeObject?.delete(AIChat);
          throw new Error("User not found");
        }

        // Relate AIChat to User
        await AIChat.relateTo(User, "chat_with_AI");

        return {
          id: AIChat.identity().toString(),
          ...AIChat.properties(),
          messages: {},
        };
      } catch (error) {
        console.error("Error in createNewAIChat resolver:", error.message);
        throw new Error("An error occurred while processing the request");
      }
    },
  },
};

module.exports = { resolvers };
