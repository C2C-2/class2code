/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const assert = require("assert");
const request = require("supertest");
const { app } = require("../../app");

// describe("Create AIChat API Tests", () => {
//   it("Should create a new AI chat for a valid user ID", () => {
//     const userId = 2; // Replace with a valid user ID
//     const mutation = `
//       mutation {
//         createNewAIChat(userId: ${userId}) {
//           _id
//           CreatedDate
//           Messages {
//             _id
//             Question
//             Answer
//             CreatedDate
//           }
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return assert.fail(err);
//         const aiChat = res.body.data.createNewAIChat;
//         assert.ok(aiChat._id);
//       });
//   });
// });

// describe("Send AI Message", () => {
//   it("Should create a new AI Message and link it with AI chat", () => {
//     const message = "can tell me about this project?";
//     const fileName = "file1.pdf";
//     const AIchatId = 39;
//     const mutation = `
//       mutation {
//         sendAIMessage(message: "${message}", fileName: "${fileName}", AIchatId: ${AIchatId}) {
//           _id
//           Question
//           Answer
//           CreatedDate
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return assert.fail(err);
//         const aiChat = res.body.data.sendAIMessage;
//         assert.ok(aiChat._id); // Ensure an ID is returned for the sent message
//         assert.strictEqual(aiChat.Question, message); // Ensure the sent message matches the input
//         assert.notEqual(aiChat.Answer, null);
//       });
//   });
// });

// describe("Create User API Tests (create)", () => {
//   it("Should create a new user with valid input data", (done) => {
//     const mutation = `
//     mutation {
//       createNewUser(user: {
//         Username: "example_username",
//         FirstName: "John",
//         LastName: "Doe",
//         Email: "john.doe@example.com",
//         Password: "secure_password",
//         Country: "United States",
//         CreatedBy: 1,
//         Rate: 4.5,
//         DateOfBirth: "1990-01-01",
//         Gender: "Male",
//         Work: "Software Developer",
//         Bio: "A passionate individual in the field of technology.",
//         LastTimeOnline: "2024-01-21T08:30:00Z",
//       }) {
//         _id
//         Username
//         FirstName
//         LastName
//         Email
//         Password
//         Country
//         IsActive
//         CreatedBy
//         CreateDate
//         Rate
//         DateOfBirth
//         Gender
//         Work
//         Bio
//         LastTimeOnline
//       }
//     }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.createNewUser._id);
//         assert.strictEqual(data.createNewUser.Username, "example_username");
//         assert.strictEqual(data.createNewUser.FirstName, "John");
//         assert.strictEqual(data.createNewUser.LastName, "Doe");
//         assert.strictEqual(data.createNewUser.Email, "john.doe@example.com");
//         assert.strictEqual(data.createNewUser.Country, "United States");
//         assert.strictEqual(data.createNewUser.Gender, "Male");
//         assert.strictEqual(data.createNewUser.Rate, 4.5);
//         assert.strictEqual(data.createNewUser.DateOfBirth, "1990-01-01");
//         assert.strictEqual(data.createNewUser.Work, "Software Developer");
//         assert.strictEqual(
//           data.createNewUser.Bio,
//           "A passionate individual in the field of technology."
//         );

//         const userId = data.createNewUser._id;

//         const mutation1 = `
//           mutation {
//             createNewChat(userId: ${userId}, chat: {
//               IsDeleted: false,
//               CreatedDate: "2024-02-26T12:00:00Z",
//             }) {
//               IsDeleted
//               CreatedDate
//             }
//           }
//         `;

//         request(app)
//           .post("/graphql")
//           .send({ query: mutation1 })
//           .expect(200)
//           .end((err1, res1) => {
//             if (err1) return done(err1);

//             const chat = res1.body.data;
//             assert.strictEqual(chat.createNewChat.IsDeleted, false);
//             assert.strictEqual(
//               chat.createNewChat.CreatedDate,
//               "2024-02-26T12:00:00Z"
//             );

//             done();
//           });
//       });
//   });
// });

// describe("Update User API Tests (update)", () => {
//   it("Should update an existing user with valid input data", (done) => {
//     const userId = 67; // Replace with an existing user ID

//     const mutation = `
//       mutation {
//         updateUser(userId: ${userId}, user: {
//           Username: "aa",
//           FirstName: "b",
//           LastName: "c",
//           Email: "abc@example.com",
//           Password: "123",
//           Country: "as",
//           IsActive: false,
//           CreatedBy: 99,
//           CreateDate: "2025-02-26T12:00:00Z",
//           Rate: 4.8,
//           DateOfBirth: "1988-05-15",
//           Gender: "Female",
//           Work: "Data Scientist",
//           Bio: "A data enthusiast with a passion for analysis.",
//           LastTimeOnline: "2024-02-26T10:00:00Z",
//         }) {
//           _id
//           Username
//           FirstName
//           LastName
//           Email
//           Country
//           IsActive
//           CreatedBy
//           CreateDate
//           Rate
//           DateOfBirth
//           Gender
//           Work
//           Bio
//           LastTimeOnline
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert(data.updateUser._id); // Ensure an ID is returned for the updated user
//         assert.strictEqual(data.updateUser.Username, "aa"); // Ensure the updated user has the expected values
//         assert.strictEqual(data.updateUser.FirstName, "b");
//         assert.strictEqual(data.updateUser.LastName, "c");
//         assert.strictEqual(data.updateUser.Email, "abc@example.com");
//         assert.strictEqual(data.updateUser.Country, "as");
//         assert.strictEqual(data.updateUser.Gender, "Female");
//         assert.strictEqual(data.updateUser.Rate, 4.8);
//         assert.strictEqual(data.updateUser.DateOfBirth, "1988-05-15");
//         assert.strictEqual(data.updateUser.Work, "Data Scientist");
//         assert.strictEqual(
//           data.updateUser.Bio,
//           "A data enthusiast with a passion for analysis."
//         );
//         assert.strictEqual(data.updateUser.IsActive, false);
//         assert.strictEqual(
//           data.updateUser.LastTimeOnline,
//           "2024-02-26T10:00:00Z"
//         );
//         assert.strictEqual(data.updateUser.CreateDate, "2025-02-26T12:00:00Z");
//         assert.strictEqual(data.updateUser.CreatedBy, 99);

//         done();
//       });
//   });
// });

// describe("Project API Tests", () => {
//   it("Should create a new project with valid input data", (done) => {
//     const mutation = `
//         mutation {
//           createNewProject(
//             project: {
//                 ProjectName: "Sample Project",
//                 ProjectDescription: "This is a sample project description.",
//                 FileName: "sample.txt",
//               }
//           ) {
//             _id
//             ProjectName
//             ProjectDescription
//             FileName
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.ok(data.createNewProject._id);
//         assert.strictEqual(data.createNewProject.ProjectName, "Sample Project");
//         assert.strictEqual(
//           data.createNewProject.ProjectDescription,
//           "This is a sample project description."
//         );
//         assert.strictEqual(data.createNewProject.FileName, "sample.txt");

//         const projectId = data.createNewProject._id;

//         const mutation1 = `
//           mutation {
//             createProjectRequirement(projectId: ${projectId}, requirement: {
//              Value: "Sample Requirement",
//             }) {
//               Value
//             }
//          }
//         `;

//         request(app)
//           .post("/graphql")
//           .send({ query: mutation1 })
//           .expect(200)
//           .end((err1, res1) => {
//             if (err1) return done(err1);
//             console.log(res1.body);
//             assert.strictEqual(
//               res1.body.data.createProjectRequirement.Value,
//               "Sample Requirement"
//             );
//             done();
//           });
//       });
//   });
// });

// describe("Create Team API Tests", () => {
//   it("Should create a new team with valid input data", (done) => {
//     const companyId = 26;

//     const mutation = `
//       mutation {
//         createNewTeam(team: {
//           TeamName: "Test Team",
//           IsDeleted: false,
//           TeamRole: "Developer",
//           CreateDate: "2024-02-26T12:00:00Z",
//         }, companyId: ${companyId}) {
//           TeamName
//           IsDeleted
//           TeamRole
//           CreateDate
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.strictEqual(data.createNewTeam.TeamName, "Test Team");
//         assert.strictEqual(data.createNewTeam.IsDeleted, false);
//         assert.strictEqual(data.createNewTeam.TeamRole, "Developer");
//         assert.strictEqual(
//           data.createNewTeam.CreateDate,
//           "2024-02-26T12:00:00Z"
//         );
//         done();
//       });
//   });
// });

