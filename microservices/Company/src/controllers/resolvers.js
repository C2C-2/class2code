/* eslint-disable space-before-function-paren */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable indent */
const Logging = require("../config/Logging");
const backup = require("../config/Backup");
const {
  redisClientGet,
  redisClientSet,
  redisClientDel,
} = require("../config/Redis");

/* this library to sync entity with data base, so with this library I can
use models to define schema for database objects and manage it without use
queries.

for example I use NeodeObject.create(model, object) to create object.
*/
const NeodeObject = require("../config/NeodeObject");

const resolvers = {
  Query: {
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
        await team.delete();

        return true;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => deleteTeam, ${error}`);
        throw new Error(`Error in deleteTeam: ${error.message}`);
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
        const { companyId, userId } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        await company.delete();

        redisClientDel(`companies_${userId}`);

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteCompany, ${error}`
        );
        throw new Error(`Error in deleteCompany: ${error.message}`);
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

        const cachedData = await redisClientGet(`companies_${userId}`);

        if (cachedData) {
          return JSON.parse(cachedData).slice(page * limit, limit);
        }

        // this query filter companies on Neo4j database
        // its return object of 2 value {records: array of result objects, summary}
        const companies = await NeodeObject?.cypher(
          `MATCH (user:User) -[r:ADMIN_OF]-> (companies:Company) 
           where ID(user) = $userId return companies 
           ORDER BY companies.${filterType} ${desc ? "desc" : "asc"}`,
          { userId }
        );

        // Store the fetched data in Redis cache
        await redisClientSet(
          `companies_${userId}`,
          JSON.stringify(
            companies?.records?.map((record) => ({
              ...record.get("companies").properties(),
              _id: `${record.get("companies").identity}`,
            }))
          )
        );

        // I make map because result is not as a schema type.
        return companies.records.slice(page * limit, limit).map((record) => ({
          ...record.get("companies").properties(),
          _id: `${record.get("companies").identity}`,
        }));
      } catch (error) {
        console.log(error);
        Logging.error(
          `${new Date()}, in resolvers.js => filterMyCompanies, ${error}`
        );
        throw new Error(`Error in filterMyCompanies: ${error.message}`);
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

        return companies.records.slice(page * limit, limit).map((record) => ({
          ...record.get("companies").properties(),
          _id: `${record.get("companies").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInMyCompanies, ${error}`
        );
        throw new Error(`Error in searchInMyCompanies: ${error.message}`);
      }
    },
    /**
     * A function to filter works companies based on given parameters.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with userId, filterType,
     * desc, page, and limit properties
     * @return {Promise} A promise that resolves to an array of filtered companies
     */
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

        const cachedData = redisClientGet(`worksCompanies_${userId}`);

        if (cachedData) {
          return JSON.parse(cachedData).slice(page * limit, limit);
        }

        const companies = await NeodeObject?.cypher(
          `
          MATCH (u:User) - [:IN_TEAM] -> (t:Team) WHERE ID(u) = $userId
          MATCH (c:Company) -[:has_a_team]-> (t) RETURN c ORDER BY companies.${filterType} ${
            desc ? "desc" : "asc"
          }
          `,
          { userId }
        );

        await redisClientSet(
          `worksCompanies_${userId}`,
          JSON.stringify(
            companies?.records?.map((record) => ({
              ...record.get("c").properties(),
              _id: `${record.get("c").identity}`,
            }))
          )
        );

        // I make map because result is not as a schema type.
        return companies.records.slice(page * limit, limit).map((record) => ({
          ...record.get("c").properties(),
          _id: `${record.get("c").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => filterWorksCompanies, ${error}`
        );
        throw new Error(`Error in filterWorksCompanies: ${error.message}`);
      }
    },
    /**
     * An asynchronous function to search for companies associated with a user.
     *
     * @param {object} parent - the parent object
     * @param {object} args - the arguments object containing userId, word, page, and limit
     * @return {array} an array of companies that match the search criteria
     */
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

        return companies.records.slice(page * limit, limit).map((record) => ({
          ...record.get("c").properties(),
          _id: `${record.get("c").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInWorksCompanies, ${error}`
        );
        throw new Error(`Error in searchInWorksCompanies: ${error.message}`);
      }
    },
    /**
     * Fetches company details and related entities such as teams, projects, and comments.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing companyId
     * @return {Object} The company details along with its comments, project, and teams
     */
    getCompany: async (parent, args) => {
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

        return {
          ...company.properties(),
          _id: `${company.identity().low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getCompany, ${error}`);
        throw new Error(`Error in getCompany: ${error.message}`);
      }
    },
    /**
     * Get all posts from other companies.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with userId, page, and limit
     * @return {Array} An array of posts for the specified user
     */
    getAllPosts: async (parent, args) => {
      try {
        // userId is required to doesn't get user posts (my posts)
        const { userId, page = 0, limit = 10 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const cachedPosts = await redisClientGet(`posts_${userId}`);

        if (cachedPosts) {
          return JSON.parse(cachedPosts).slice(
            page * limit,
            (page + 1) * limit
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
           MATCH (u:User) -[:ADMIN_OF] -> (c1:Company)
           WHERE ID(u) = $userId AND ID(c) <> ID(c1)
           RETURN p, c`,
          { userId }
        );

        if (!posts) {
          throw new Error("Posts not found");
        }

        await redisClientSet(`posts_${userId}`, JSON.stringify(posts.records));

        return posts.records
          .slice(page * limit, (page + 1) * limit)
          .map((record) => ({
            ...record.get("p").properties(),
            _id: `${record.get("p").identity}`,
          }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getAllPosts, ${error}`
        );
        throw new Error(`Error in getAllPosts: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to search for position posts based on specified criteria.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The input arguments including page, limit, word, and userId
     * @return {Array} An array of position posts matching the specified criteria
     */
    searchInPositionPosts: async (parent, args) => {
      try {
        const { page = 0, limit = 10, word, userId } = args;

        if (!word) {
          throw new Error(
            `Are you send word? word is required, word value is ${word}. please check word value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const posts = await NeodeObject?.cypher(
          `
          MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
          MATCH (u:User) -[:ADMIN_OF] -> (c1:Company)
          where p.Content CONTAINS $word AND ID(u) = $userId AND ID(c) <> ID(c1)
          return p
          `,
          { word, userId }
        );

        if (!posts) {
          Logging.warn(
            `${new Date()}, in resolvers.js => searchInPositionPosts, posts not found`
          );
          throw new Error("Posts not found");
        }

        return posts.records
          .slice(page * limit, (page + 1) * limit)
          .map((record) => ({
            ...record.get("p").properties(),
            _id: `${record.get("p").identity}`,
          }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInPositionPosts, ${error}`
        );
        throw new Error(`Error in searchInPositionPosts: ${error.message}`);
      }
    },
    /**
     * A function to retrieve all posts sorted by date desc or asc.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object including page, limit, isDESC, and userId
     * @return {Array} An array of posts sorted by date
     */
    getAllPostsSortedByDate: async (parent, args) => {
      try {
        const { page = 0, limit = 10, isDESC = false, userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const cachedPosts = await redisClientGet(`posts_${userId}`);

        if (cachedPosts) {
          return JSON.parse(cachedPosts).slice(
            page * limit,
            (page + 1) * limit
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
           MATCH (u:User) -[:ADMIN_OF] -> (c1:Company)
           WHERE ID(u) = $userId AND ID(c) <> ID(c1)
           RETURN p ORDER BY p.CreatedDate ${isDESC ? "DESC" : "ASC"}`,
          { userId }
        );

        if (!posts) {
          throw new Error("Posts not found");
        }

        await redisClientSet(`posts_${userId}`, JSON.stringify(posts.records));

        return posts.records
          .slice(page * limit, (page + 1) * limit)
          .map((record) => ({
            ...record.get("p").properties(),
            _id: `${record.get("p").identity}`,
          }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getAllPostsSortedByDate, ${error}`
        );
        throw new Error(`Error in getAllPostsSortedByDate: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to search in user posts based on provided criteria.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing page, limit, word, and userId
     * @return {array} An array of posts matching the search criteria
     */
    searchInMyPosts: async (parent, args) => {
      try {
        const { page = 0, limit = 10, word, userId } = args;

        if (!word) {
          throw new Error(
            `Are you send word? word is required, word value is ${word}. please check word value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (u:User) -[:ADMIN_OF] -> (c:Company)
          MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
          WHERE ID(u) = $userId AND p.Content CONTAINS $word
          RETURN p`,
          { word, userId }
        );

        return posts.records
          .slice(page * limit, (page + 1) * limit)
          .map((record) => ({
            ...record.get("p").properties(),
            _id: `${record.get("p").identity}`,
          }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInMyPosts, ${error}`
        );
        throw new Error(`Error in searchInMyPosts: ${error.message}`);
      }
    },
    /**
     * Retrieves all of the user's posts sorted by date in desc or asc order.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object including page, limit, isDESC, and userId.
     * @return {Array} An array of post objects sorted by date.
     */
    getAllMyPostsSortedByDate: async (parent, args) => {
      try {
        const { page = 0, limit = 10, isDESC = false, userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const cachedPosts = await redisClientGet(`myPosts_${userId}`);

        if (cachedPosts) {
          return JSON.parse(cachedPosts).slice(
            page * limit,
            (page + 1) * limit
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (u:User) -[:ADMIN_OF] -> (c:Company)
          MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
          WHERE ID(u) = $userId
          RETURN p ORDER BY p.CreatedDate ${isDESC ? "DESC" : "ASC"}`,
          { userId }
        );

        if (!posts) {
          throw new Error("Posts not found");
        }

        await redisClientSet(
          `myPosts_${userId}`,
          JSON.stringify(posts.records)
        );

        return posts.records
          .slice(page * limit, (page + 1) * limit)
          .map((record) => ({
            ...record.get("p").properties(),
            _id: `${record.get("p").identity}`,
          }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getAllMyPostsSortedByDate, ${error}`
        );
        throw new Error(`Error in getAllMyPostsSortedByDate: ${error.message}`);
      }
    },
    /**
     * Async function to get a team with all its members.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object
     * @return {Object} The team object
     */
    getTeam: async (parent, args) => {
      try {
        const { teamId } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        const team = await NeodeObject?.find("Team", teamId);

        return {
          ...team.properties(),
          _id: `${team.identity().low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getTeam, ${error}`);
        throw new Error(`Error in getTeam: ${error.message}`);
      }
    },
    deleteUserFromTeam: async (parent, args) => {
      try {
        const { userId, teamId } = args;

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

        await NeodeObject?.writeCypher(
          `MATCH (u:User) -[r:IN_TEAM]-> (t:Team) WHERE ID(u) = $userId AND ID(t) = $teamId
           DETACH DELETE r`,
          { userId, teamId }
        );

        redisClientDel(`worksCompanies_${userId}`);

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteUserFromTeam, ${error}`
        );
        throw new Error(`Error in deleteUserFromTeam: ${error.message}`);
      }
    },
    deletePost: async (parent, args) => {
      try {
        const { postId, userId } = args;

        if (!postId) {
          throw new Error(
            `Are you send postId? postId is required, postId value is ${postId}. please check postId value before send`
          );
        }

        const post = await NeodeObject?.find("Post", postId);

        if (!post) {
          throw new Error(
            `Are you send postId? postId is required, postId value is ${postId}. please check postId value before send`
          );
        }

        await NeodeObject?.delete(`posts_${userId}`);
        await NeodeObject?.delete(`myPosts_${userId}`);

        await redisClientDel("allPosts");

        return true;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => deletePost, ${error}`);
        throw new Error(`Error in deletePost: ${error.message}`);
      }
    },
    deleteCompanyComment: async (parent, args) => {
      try {
        const { commentId } = args;

        if (!commentId) {
          throw new Error(
            `Are you send commentId? commentId is required, commentId value is ${commentId}. please check commentId value before send`
          );
        }

        const comment = await NeodeObject?.find("CompanyComment", commentId);

        if (!comment) {
          throw new Error(
            `Are you send commentId? commentId is required, commentId value is ${commentId}. please check commentId value before send`
          );
        }

        await NeodeObject?.delete(comment);

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteCompanyComment, ${error}`
        );
        throw new Error(`Error in deleteCompanyComment: ${error.message}`);
      }
    },
  },
  Mutation: {
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
        const teamCreated = await NeodeObject?.create("Team", { ...team });
        await company.relateTo(teamCreated, "has_a_team");

        backup.info(
          `CREATE (team:Team {createdDate: datetime(), ${Object.keys(team)
            ?.map((key) => `${key}: "${team[key]}"`)
            .join(", ")}})
          CREATE (company:Company) -[has_a_team:HAS_A_TEAM]-> (team)
          WHERE ID(company) = ${companyId}
          RETURN team`
        );

        return teamCreated.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewTeam, ${error}`
        );
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

        const companyCreated = await NeodeObject?.create("Company", {
          ...company,
        });

        await user.relateTo(companyCreated, "admin_of");

        await redisClientDel(`companies_${userId}`);

        backup.info(
          `CREATE (company:Company {createdDate: datetime(), ${Object.keys(
            company
          )
            ?.map((key) => `${key}: "${company[key]}"`)
            .join(", ")}})
          CREATE (user:User) -[admin_of:ADMIN_OF]-> (company)
          WHERE ID(user) = ${userId}
          RETURN company`
        );

        redisClientDel(`companies_${userId}`);

        return {
          ...companyCreated.properties(),
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewCompany, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
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
        const { post, companyId, userId } = args;

        if (!post) {
          throw new Error(
            `Are you send post? post is required, post value is ${post}. please check post value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found, please create one first");
        }

        const newPost = await NeodeObject?.create("PositionPost", { ...post });

        await redisClientDel(`myPosts_${userId}`);

        await company.relateTo(newPost, "has_a_post");

        backup.info(
          `CREATE (post:PositionPost {createdDate: datetime(), ${Object.keys(
            post
          )
            ?.map((key) => `${key}: "${post[key]}"`)
            .join(", ")}})
          CREATE (company:Company) -[has_a_post:HAS_A_POST]-> (post)
          WHERE ID(company) = ${companyId}
          RETURN post`
        );

        return newPost.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createPositionPost, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Add a user to a team with a specified role.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId, teamId, and role
     * @return {boolean} true if the user was successfully added to the team, false otherwise
     */
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
           MATCH (c:Company)-[r:HAS_A_TEAM]->(t)
           CREATE (n) -[r:IN_TEAM {role: $role}] -> (t)
           CREATE (n) -[r:WORK_ON] -> (c)
           RETURN t`,
          { userId, teamId, role }
        );

        await redisClientDel(`worksCompanies_${userId}`);

        backup.info(
          `MATCH (n:User) WHERE ID(n) = ${userId}
           MATCH (t:Team) WHERE ID(t) = ${teamId}
           CREATE (n) -[r:IN_TEAM {role: ${role}}] -> (t)`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => addUserToTeam, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a comment for a company from company profile.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing comment and companyId
     * @return {Object} The newly created comment
     */
    createCompanyComment: async (parent, args) => {
      try {
        const { comment, companyId } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        const newComment = await NeodeObject?.create("Comment", { ...comment });

        await company.relateTo(newComment, "has_a_comment");

        backup.info(
          `CREATE (c:Comment { 
            createdDate: datetime(), 
            ${Object.keys(comment)
              ?.map((key) => `${key}: "${comment[key]}"`)
              .join(", ")} }) -[has_a_comment:HAS_A_COMMENT]-> (company:Company)
          WHERE ID(company) = ${companyId}
          RETURN c`
        );

        return newComment.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createCompanyComment, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to update a company.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing companyId and company
     * @return {Object} The updated company object
     */
    updateCompany: async (parent, args) => {
      try {
        const { companyId, company, userId } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const updatedCompany = await NeodeObject?.findById(
          "Company",
          companyId
        ).then((c) => c.update({ ...company }));

        if (!updatedCompany) {
          throw new Error("Company not found");
        }

        redisClientDel(`companies_${userId}`);

        backup.info(
          `MATCH (c:Company) WHERE ID(c) = ${companyId}
          SET c = {${Object.keys(company)
            ?.map((key) => `${key}: "${company[key]}"`)
            .join(", ")}} RETURN c`
        );

        return {
          ...updatedCompany.properties(),
          _id: `${updatedCompany?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => updateCompany, ${error}`
        );
        throw error;
      }
    },
    /**
     * Asynchronously updates the position post.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing postId and positionPost
     * @return {object} The updated position post in JSON format
     */
    updatePositionPost: async (parent, args) => {
      try {
        const { postId, positionPost, userId } = args;

        if (!postId) {
          throw new Error(
            `Are you send postId? postId is required, postId value is ${postId}. please check postId value before send`
          );
        }

        const updatedPositionPost = await NeodeObject?.findById(
          "PositionPost",
          postId
        ).then((p) => p.update({ ...positionPost }));

        if (!updatedPositionPost) {
          throw new Error("Position post not found");
        }

        await redisClientDel(`myPosts_${userId}`);

        backup.info(
          `MATCH (pp:PositionPost)
          WHERE ID(pp) = ${postId}
          SET pp = {${Object.keys(positionPost)
            ?.map((key) => `${key}: "${positionPost[key]}"`)
            .join(", ")}} RETURN pp`
        );

        return {
          ...updatedPositionPost?.properties(),
          _id: `${updatedPositionPost?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => updatePositionPost, ${error}`
        );
        throw error;
      }
    },
    /**
     * A function to apply to a post.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing postId and userId
     * @return {boolean} true if the operation is successful
     */
    applyToPost: async (parent, args) => {
      try {
        const { postId, userId } = args;

        if (!postId) {
          throw new Error(
            `Are you send postId? postId is required, postId value is ${postId}. please check postId value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.findById("User", userId);

        if (!user) {
          throw new Error("User not found");
        }

        const positionPost = await NeodeObject?.findById(
          "PositionPost",
          postId
        );

        if (!positionPost) {
          throw new Error("Position post not found");
        }

        await user.relateTo(positionPost, "apply_to");

        backup.info(
          `MATCH (pp:PositionPost)
          WHERE ID(pp) = ${postId}
          SET pp = {isApplied: true} RETURN pp`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => applyToPost, ${error}`
        );
        throw error;
      }
    },
    /**
     * A function to user to apply for a project for a company.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing projectId and companyId
     * @return {boolean} Whether the application was successful
     */
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
          Logging.warn(
            `${new Date()}, in resolvers.js => applyForProject, project not found`
          );
          throw new Error("Project not found");
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        await company.relateTo(project, "TAKE_A_PROJECT");

        backup.info(
          `MATCH (c:Company) WHERE ID(c) = ${companyId}
              MATCH (p:Project) WHERE ID(p) = ${projectId}
              Create (c)-[:TAKE_A_PROJECT]->(p)
              )}`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => applyForProject, ${error}`
        );
        throw new Error(`Error in applyForProject: ${error.message}`);
      }
    },
    updateTeam: async (parent, args) => {
      try {
        const { teamId, team } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        if (!team) {
          throw new Error(
            `Are you send team? team is required, team value is ${team}. please check team value before send`
          );
        }

        const teamNode = await NeodeObject?.findById("Team", teamId);

        if (!teamNode) {
          throw new Error("Team not found");
        }

        await teamNode.update(team);

        backup.info(
          `MATCH (team:Team) WHERE ID(team) = ${teamId}
          SET team = {${Object.keys(team)
            ?.map((key) => `${key}: "${team[key]}"`)
            .join(", ")} }
          RETURN team`
        );

        return {
          ...teamNode?.properties(),
          _id: `${teamNode?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => updateTeam, ${error}`);
        throw new Error(`Error in updateTeam: ${error.message}`);
      }
    },
  },
  Company: {
    Teams: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_TEAM]->(teams:Team)
           WHERE ID(company) = $companyId
           RETURN teams`;

        const result = await NeodeObject.cypher(cypherQuery, { companyId });

        return result?.records?.map((record) => ({
          ...record.get("teams").properties(),
          id: record.get("teams").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Teams, ${error}`);
        throw error;
      }
    },
    Comments: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_COMMENT]->(comments:Comment)
           WHERE ID(company) = $companyId
           RETURN comments`;

        const result = await NeodeObject.cypher(cypherQuery, { companyId });

        return result?.records?.map((record) => ({
          ...record.get("comments").properties(),
          id: record.get("comments").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Comments, ${error}`);
        throw error;
      }
    },
    Posts: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_POST]->(posts:PositionPost)
           WHERE ID(company) = $companyId
           RETURN posts`;

        const result = await NeodeObject.cypher(cypherQuery, { companyId });

        return result?.records?.map((record) => ({
          ...record.get("posts").properties(),
          id: record.get("posts").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Posts, ${error}`);
        throw error;
      }
    },
    Tasks: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (tasks:Task)-[:IN_COMPANY]->(company:Company)
           WHERE ID(company) = $companyId
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery, { companyId });

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties(),
          Priority: record.get("tasks")?.properties?.Priority?.low,
          id: record.get("tasks").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
    Project: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
        MATCH (c:Company) -[:TAKE_A_PROJECT] -> (p:Project)
        WHERE ID(c) = $companyId
        RETURN p`;

        const result = await NeodeObject.cypher(cypherQuery, { companyId });

        return result?.records?.map((record) => ({
          ...record.get("p").properties(),
          id: record.get("p").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Project, ${error}`);
        throw error;
      }
    },
  },
  AIChat: {
    Messages: async (parent) => {
      try {
        const chatId = parent._id;
        const { page, limit } = parent;

        if (!chatId) {
          throw new Error("ChatID is null");
        }

        const cache = await redisClientGet(`messages_${chatId}`);

        if (cache) {
          return JSON.parse(cache)?.slice(page * limit, (page + 1) * limit);
        }

        // this query get chat by chatId with all messages.
        const cypherQuery = `
           MATCH (chat:AIChat)-[:HAS_A]->(messages:AIMessage) 
           WHERE ID(chat) = $chatId 
           RETURN messages`;
        const result = await NeodeObject.cypher(cypherQuery, { chatId });

        if (!result) {
          return [];
        }

        await redisClientSet(
          `messages_${chatId}`,
          JSON.stringify(
            result?.records?.map((record) => ({
              ...record.get("messages").properties(),
              _id: `${record.get("messages").identity().low}`,
            }))
          )
        );

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          .map((record) => ({
            ...record.get("messages").properties(),
            _id: `${record.get("messages").identity().low}`,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Messages, ${error}`);
        throw error;
      }
    },
  },
  User: {
    MyCompanies: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cache = await redisClientGet(`companies_${userId}`);

        if (cache) {
          return JSON.parse(cache)?.slice(page * limit, (page + 1) * limit);
        }

        const cypherQuery = `
           MATCH (user:User)-[:ADMIN_OF]->(companies:Company)
           WHERE ID(user) = $userId
           RETURN companies`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        if (!result) {
          return [];
        }

        await redisClientSet(
          `companies_${userId}`,
          JSON.stringify(
            result?.records?.map((record) => ({
              ...record.get("companies").properties(),
              _id: `${record.get("companies").identity().low}`,
            }))
          )
        );

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("companies").properties(),
            _id: `${record.get("companies").identity().low}`,
          }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => MyCompanies, ${error}`
        );
        throw error;
      }
    },
    WorkCompanies: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cache = await redisClientGet(`worksCompanies_${userId}`);

        if (cache) {
          return JSON.parse(cache)?.slice(page * limit, (page + 1) * limit);
        }

        const cypherQuery = `
           MATCH (user:User)-[:WORK_ON]-> (companies:Company)
           WHERE ID(user) = $userId
           RETURN companies`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        if (!result) {
          return [];
        }

        await redisClientSet(
          `worksCompanies_${userId}`,
          JSON.stringify(
            result?.records?.map((record) => ({
              ...record.get("companies").properties(),
              _id: `${record.get("companies").identity().low}`,
            }))
          )
        );

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("companies").properties(),
            _id: `${record.get("companies").identity().low}`,
          }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => WorkCompanies, ${error}`
        );
        throw error;
      }
    },
    Skills: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cache = await redisClientGet(`skills_${userId}`);

        if (cache) {
          return JSON.parse(cache)?.slice(page * limit, (page + 1) * limit);
        }

        const cypherQuery = `
           MATCH (user:User)-[:HAS_A_SKILL]->(skills:Skill)
           WHERE ID(user) = $userId
           RETURN skills`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        if (!result) {
          return [];
        }

        await redisClientSet(
          `skills_${userId}`,
          JSON.stringify(
            result?.records?.map((record) => ({
              ...record.get("skills").properties(),
              _id: `${record.get("skills").identity().low}`,
            }))
          )
        );

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("skills").properties(),
            _id: `${record.get("skills").identity().low}`,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Skills, ${error}`);
        throw error;
      }
    },
    Accounts: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User)-[:HAS_A_SOCIAL_MEDIA]->(accounts:SocialMediaLink)
           WHERE ID(user) = $userId
           RETURN accounts`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("accounts").properties(),
            _id: record.get("accounts").identity().low,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Accounts, ${error}`);
        throw error;
      }
    },
    Tasks: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User)-[:HAS_A_TASK]->(tasks:Task)
           WHERE ID(user) = $userId
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("tasks").properties(),
            Priority: record.get("tasks")?.properties()?.Priority?.low,
            _id: record.get("tasks").identity().low,
            page,
            limit,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
    Chats: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User)-[:CHAT_WITH]->(chats:Chat)
           WHERE ID(user) = $userId
           RETURN chats`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("chats").properties(),
            _id: record.get("chats").identity().low,
            page,
            limit,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Chats, ${error}`);
        throw error;
      }
    },
    Educations: async (parent) => {
      try {
        const userId = parent._id;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User)-[:LEARN_A]->(educations:Education)
           WHERE ID(user) = $userId
           RETURN educations`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        return result?.records?.map((record) => ({
          ...record.get("educations").properties(),
          _id: record.get("educations").identity().low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Educations, ${error}`);
        throw error;
      }
    },
    AIChats: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User)-[:CHAT_WITH_AI]->(chats:AIChat)
           WHERE ID(user) = $userId
           RETURN chats`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("chats").properties(),
            _id: record.get("chats").identity().low,
            page,
            limit,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => AIChats, ${error}`);
        throw error;
      }
    },
    CreatedTasks: async (parent) => {
      try {
        const userId = parent._id;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User)-[:CREATE_TASK]->(tasks:Task)
           WHERE ID(user) = $userId
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties(),
          Priority: record.get("tasks")?.properties?.Priority?.low,
          _id: record.get("tasks").identity().low,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => CreatedTasks, ${error}`
        );
        throw error;
      }
    },
    Posts: async (parent) => {
      try {
        const userId = parent._id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User)-[:APPLY_TO]->(posts:PositionPost)
           WHERE ID(user) = $userId
           RETURN posts`;

        const result = await NeodeObject.cypher(cypherQuery, { userId });

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("posts").properties(),
            _id: record.get("posts")?.identity?.low,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Posts, ${error}`);
        throw error;
      }
    },
  },
  Project: {
    Notes: async (parent) => {
      try {
        const projectId = parent._id;

        if (!projectId) {
          throw new Error("ProjectID is null");
        }

        const cypherQuery = `
           MATCH (project:Project)-[:HAS_NOTE]->(notes:ProjectNote)
           WHERE ID(project) = $projectId
           RETURN notes`;

        const result = await NeodeObject.cypher(cypherQuery, { projectId });

        return result?.records?.map((record) => ({
          ...record.get("notes").properties(),
          id: record.get("notes").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Notes, ${error}`);
        throw error;
      }
    },
    Requirements: async (parent) => {
      try {
        const projectId = parent._id;

        if (!projectId) {
          throw new Error("ProjectID is null");
        }

        const cypherQuery = `
           MATCH (project:Project)-[:HAS_REQUIREMENT]->(requirements:ProjectRequirement)
           WHERE ID(project) = $projectId
           RETURN requirements`;

        const result = await NeodeObject.cypher(cypherQuery, { projectId });

        return result?.records?.map((record) => ({
          ...record.get("requirements").properties(),
          id: record.get("requirements").identity,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => Requirements, ${error}`
        );
        throw error;
      }
    },
    Applies: async (parent) => {
      try {
        const projectId = parent._id;

        if (!projectId) {
          throw new Error(`ProjectID is ${projectId}`);
        }

        const cypherQuery = `
           MATCH (companies:Company)-[:TAKE_A_PROJECT]->(project:Project)
           WHERE ID(project) = $projectId
           RETURN companies`;

        const result = await NeodeObject.cypher(cypherQuery, { projectId });

        return result?.records?.map((record) => ({
          ...record.get("companies").properties(),
          id: record.get("companies").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Applies, ${error}`);
        throw error;
      }
    },
  },
  Chat: {
    Messages: async (parent) => {
      try {
        const chatId = parent._id;
        const { page, limit } = parent;

        if (!chatId) {
          throw new Error("ChatID is null");
        }

        const cypherQuery = `
           MATCH (chat:Chat)-[:HAS_A]->(messages:Message)
           WHERE ID(chat) = $chatId
           RETURN messages`;

        const result = await NeodeObject.cypher(cypherQuery, { chatId });

        return result?.records
          ?.slice(page * limit, (page + 1) * limit)
          ?.map((record) => ({
            ...record.get("messages").properties(),
            userId: record.get("messages")?.properties?.userId?.low,
            _id: record.get("messages").identity().low,
          }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Messages, ${error}`);
        throw error;
      }
    },
  },
  ProjectNote: {
    Tasks: async (parent) => {
      try {
        const noteId = parent._id;

        if (!noteId) {
          throw new Error("NoteID is null");
        }

        const cypherQuery = `
           MATCH (projectNote:ProjectNote)-[:HAS_TASK]->(tasks:ProjectNoteTask)
           WHERE ID(projectNote) = $noteId
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery, { noteId });

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties(),
          id: record.get("tasks").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
  },
  Task: {
    Steps: async (parent) => {
      try {
        const taskId = parent._id;

        if (!taskId) {
          throw new Error("TaskID is null");
        }

        const cypherQuery = `
           MATCH (task:Task)-[:HAS_A]->(taskSteps:TaskStep)
           WHERE ID(task) = $taskId
           RETURN taskSteps`;

        const result = await NeodeObject.cypher(cypherQuery, { taskId });

        return result?.records?.map((record) => ({
          ...record.get("taskSteps").properties(),
          Number: record.get("taskSteps")?.properties?.Number?.low,
          _id: record.get("taskSteps").identity().low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Steps, ${error}`);
        throw error;
      }
    },
  },
  Team: {
    Tasks: async (parent) => {
      try {
        const teamId = parent._id;

        if (!teamId) {
          throw new Error("TeamID is null");
        }

        const cypherQuery = `
           MATCH (team:Team)-[:HAS_A_TASK]->(tasks:Task)
           WHERE ID(team) = $teamId
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery, { teamId });

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties(),
          Priority: record.get("tasks")?.properties?.Priority?.low,
          id: record.get("tasks").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
    Members: async (parent) => {
      try {
        const teamId = parent._id;

        if (!teamId) {
          throw new Error("TeamID is null");
        }

        const cypherQuery = `
           MATCH (users:User)-[:IN_TEAM]->(team:Team)
           WHERE ID(team) = $teamId
           RETURN users`;

        const result = await NeodeObject.cypher(cypherQuery, { teamId });

        return result?.records?.map((record) => ({
          ...record.get("users").properties(),
          id: record.get("users").identity,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Members, ${error}`);
        throw error;
      }
    },
  },
};

module.exports = { resolvers };
