const axios = require("axios");
const base64 = require("base-64"); // For base64 encoding

const resolvers = {
  Query: {
    AIMessage: async (parent, args) => {
      const username = "QA2!eR23c";
      const password = "yu23M@1R!f";
      const credentials = `${username}:${password}`;
      const message = args.message;
      const fileName = args.fileName;

      // Base64 encode the credentials
      const encodedCredentials = base64.encode(credentials);

      // Replace 'https://example.com/api/aimessage' with the actual API endpoint
      const response = await axios.post(
        "http://127.0.0.1:5000/read_pdf",
        { query: message, filename: fileName },
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the API returns a JSON object, you can return the data
      return {
        response: response.data,
      };
    },
  },
};

module.exports = { resolvers };
