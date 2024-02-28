/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const assert = require("assert");
const request = require("supertest");
const { app } = require("../../app");

// describe("AIChat API Tests", () => {
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

// describe("User API Tests", () => {
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
//         done();
//       });
//   });
// });

// describe("User API Tests", () => {
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
