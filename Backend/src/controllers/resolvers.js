const axios = require("axios");
const base64 = require("base-64");
const NeodeObject = require("../config/NeodeObject");
const Variables = require("../config/Variables");

const resolvers = {
  Query: {
    sendMessage: async (parent, args) => {
      const username = "QA2!eR23c";
      const password = "yu23M@1R!f";
      const credentials = `${username}:${password}`;
      const message = args.message;
      const fileName = args.fileName;
      const chatId = args.chatId;

      // Base64 encode the credentials
      const encodedCredentials = base64.encode(credentials);

      // Replace 'https://example.com/api/aimessage' with the actual API endpoint
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
      const [chat, createdMessage] = await Promise.all([
        chatId
          ? NeodeObject.findById("AIChat", chatId)
          : NeodeObject.create("AIChat", {}),
        NeodeObject.create("AIMessage", {
          Question: message,
          Answer: response.data,
        }),
      ]);

      // Relate AIMessage to AIChat
      await createdMessage.relateTo(chat, "has_a");

      // Return the created AIMessage
      return {
        id: createdMessage.identity().toString(),
        ...createdMessage.properties(),
      };
    },
  },
};

module.exports = { resolvers };
