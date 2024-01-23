const axios = require("axios");
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tokens = require("../mysqlModels/Tokens");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

const myEmail = "202007723@bethlehem.edu";

const transporter = nodemailer.createTransport({
  service: "gmail", // Update with your email service provider (e.g., 'gmail', 'yahoo', etc.)
  auth: {
    user: myEmail, // Update with your email address
    pass: process.env.EMAIL_PASSWORD, // Update with your email password or an app-specific password
  },
});

async function verify(token) {
  const ticket = await client.verifyidToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

const getLinkedInAccessToken = async (code) => {
  const response = await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    `grant_type=authorization_code&code=${code}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

const getLinkedInUserProfile = async (accessToken) => {
  const response = await axios.get("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const getGitHubAccessToken = async (code) => {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data.access_token;
};

const getGitHubUser = async (accessToken) => {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

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
    logout: async (parent, args) => {
      try {
        const { userID } = args;

        if (userID === null) {
          throw new Error(
            `Are you send userID? UserID is required, userID value is ${userID}. please check userID value before send`
          );
        }

        await Tokens.destroy({
          where: {
            userID,
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
    login: async (parent, args) => {
      try {
        const { username, password } = args;

        if (!username) {
          throw new Error(
            `Are you send username? username is required, username value is ${username}. please check username value before send`
          );
        }

        if (!password) {
          throw new Error("Are you send password? username is required");
        }

        // NeodeObject is Object from Neode library to manage database without use queries.
        const [User] = await Promise.all([
          NeodeObject?.first("User", { Username: username }),
        ]);

        if (User === false) {
          throw new Error(
            "User not found, check again please userID and username"
          );
        }

        const userID = User.identity().toString();

        const tokenResult = bcrypt
          .compare(password, User.properties().Password)
          .catch(() => {
            throw new Error(
              "Are you sure you send correct username and password? please check it again"
            );
          });

        if (!tokenResult) {
          throw new Error(
            "Are you sure you send correct username and password? please check it again"
          );
        }

        let token = jwt.sign({ id: userID }, "userToken");

        if (token === null) {
          token = jwt.sign({ id: userID }, "userToken");
          if (token === null) {
            throw new Error("something wrong in system please try again");
          }
        }

        // this to save token in Mysql database to check is correct or not.
        Tokens.create({ userID, token }).catch((error) => {
          throw new Error(
            `something wrong in system please try again (${error})`
          );
        });
        return token;
      } catch (error) {
        throw new Error("An error occurred while processing the request");
      }
    },
    loginByGoogle: async (parent, args) => {
      try {
        const { idToken } = args;

        if (!idToken) {
          throw new Error("Google ID token is required");
        }

        const payload = await verify(idToken);

        // Check if the user exists in your database
        const [User] = await Promise.all([
          NeodeObject?.first("User", { Email: payload.email }),
        ]);

        if (!User) {
          throw new Error("User not found, please register first");
        }

        const userID = User.identity().toString();

        let token = jwt.sign({ id: userID }, "userToken");

        if (token === null) {
          token = jwt.sign({ id: userID }, "userToken");
          if (token === null) {
            throw new Error("something wrong in system please try again");
          }
        }

        // this to save token in Mysql database to check is correct or not.
        Tokens.create({ userID, token }).catch((error) => {
          throw new Error(
            `something wrong in system please try again (${error})`
          );
        });

        return token;
      } catch (error) {
        throw new Error("An error occurred while processing the request");
      }
    },
    loginByLinkedin: async (parent, args) => {
      try {
        const { code } = args;

        if (!code) {
          throw new Error("LinkedIn authorization code is required");
        }

        // Exchange the authorization code for an access token
        const accessToken = await getLinkedInAccessToken(code);

        // Get user profile information from LinkedIn
        const linkedinUserProfile = await getLinkedInUserProfile(accessToken);

        // Check if the user exists in your database
        const [User] = await Promise.all([
          NeodeObject?.first("User", { LinkedInID: linkedinUserProfile.id }),
        ]);

        if (!User) {
          throw new Error("User not found, please register first");
        }

        const userID = User.identity().toString();

        let token = jwt.sign({ id: userID }, "userToken");

        if (token === null) {
          token = jwt.sign({ id: userID }, "userToken");
          if (token === null) {
            throw new Error(
              "Something went wrong in the system, please try again"
            );
          }
        }

        // Save token in the database to check if it's correct or not
        Tokens.create({ userID, token }).catch((error) => {
          throw new Error(
            `Something went wrong in the system, please try again (${error})`
          );
        });

        return token;
      } catch (error) {
        throw new Error("An error occurred while processing the request");
      }
    },
    loginByGitHup: async (parent, args) => {
      try {
        const { code } = args;

        if (!code) {
          throw new Error("GitHub authorization code is required");
        }

        // Exchange the authorization code for an access token
        const accessToken = await getGitHubAccessToken(code);

        // Get user information from GitHub
        const githubUser = await getGitHubUser(accessToken);

        // Check if the user exists in your database
        const [User] = await Promise.all([
          NeodeObject?.first("User", { GitHubID: githubUser.id }),
        ]);

        if (!User) {
          throw new Error("User not found, please register first");
        }

        const userID = User.identity().toString();

        let token = jwt.sign({ id: userID }, "userToken");

        if (token === null) {
          token = jwt.sign({ id: userID }, "userToken");
          if (token === null) {
            throw new Error(
              "Something went wrong in the system, please try again"
            );
          }
        }

        // Save token in the database to check if it's correct or not
        Tokens.create({ userID, token }).catch((error) => {
          throw new Error(
            `Something went wrong in the system, please try again (${error})`
          );
        });

        return token;
      } catch (error) {
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

        return {
          id: User.identity().toString(),
          Username: newUser.Username,
          FirstName: newUser.FirstName,
          LastName: newUser.LastName,
          Email: newUser.Email,
          Country: newUser.Country,
          IsActive: newUser.IsActive,
          CreatedBy: newUser.CreatedBy,
          CreateDate: newUser.CreateDate,
          Rate: newUser.Rate,
          DateOfBirth: newUser.DateOfBirth,
          Gender: newUser.Gender,
          Work: newUser.Work,
          Bio: newUser.Bio,
          LastTimeOnline: newUser.LastTimeOnline,
        };
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
  },
};

module.exports = { resolvers };
