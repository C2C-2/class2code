const axios = require("axios");
const base64 = require("base-64");

/*this library to sync entity with data base, so with this library I can
use models to define schema for database objects and manage it without use
queries.

for example I use NeodeObject.create(model, object) to create object. 
*/
const NeodeObject = require("../config/NeodeObject");

//this file save all global variables like urls
//it return module (javascript object)
const Variables = require("../config/Variables");

const resolvers = {
  Query: {
    /*this to send message to AI module and get answer about a project from
    it file */
    sendMessage: async (parent, args) => {
      try {
        //this used to basic auth in python backend (AI model)
        const username = process.env.AI_USERNAME;
        const password = process.env.AI_PASSWORD;
        const credentials = `${username}:${password}`;

        //this string args from frontend as parameters to AI chat
        const message = args.message;

        //########################################################
        //this will be change after create team object to Team ID so
        //we get company then project then file name from project
        const fileName = args.fileName;
        //########################################################

        //this int args from to check if chat already exist or create new
        const chatID = args.chatID;

        // Base64 encode the credentials
        //this step required to send username & password to auth
        const encodedCredentials = base64.encode(credentials);

        //this to get answer from AI model about some question
        //return type is string
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

        //Create AIChat and AIMessage nodes
        //I save it in database to get it when user need it from old chats
        const [chat, createdMessage] = await Promise.all([
          chatID
            ? NeodeObject.findById("AIChat", chatID)
            : NeodeObject.create("AIChat", {}),
          NeodeObject.create("AIMessage", {
            Question: message,
            Answer: response.data,
          }),
        ]);

        // Relate AIMessage to AIChat
        await createdMessage.relateTo(chat, "has_a");

        return {
          id: createdMessage.identity().toString(),
          ...createdMessage.properties(),
        };
      } catch (error) {
        console.error("Error in sendMessage resolver:", error.message);
        throw new Error("An error occurred while processing the request");
      }
    },

    createNewAIChat: async (parent, args) => {
      const userID = args.userID;
      console.log(userID);

      const [AIChat, User] = await Promise.all([
        NeodeObject?.create("AIChat", {}),
        NeodeObject?.findById("User", userID),
      ]);

      // Relate AIChat to User
      await AIChat.relateTo(user, "has_a");

      return {
        id: AIChat.identity().toString(),
        ...AIChat.properties(),
        messages: {},
      };
    },

    getAIChat: async (parent, args) => {
      try {
        const chatID = args.chatID;
        const cypherQuery =
          "MATCH (chat:AIChat)-[:HAS_A]->(message:AIMessage) WHERE ID(chat) = $chatID RETURN chat, collect(message) as messages";
        const result = await NeodeObject.cypher(cypherQuery, { chatID });

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
};

module.exports = { resolvers };
