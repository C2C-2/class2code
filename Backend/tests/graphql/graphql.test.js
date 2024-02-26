const assert = require("assert");
const request = require("supertest");
const { app } = require("../../app");

describe("AIChat API Tests", () => {
  it("Should create a new AI chat for a valid user ID", () => {
    const userId = 2; // Replace with a valid user ID
    const mutation = `
      mutation {
        createNewAIChat(userId: ${userId}) {
          _id
          CreatedDate
          Messages {
            _id
            Question
            Answer
            CreatedDate
          }
        }
      }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return assert.fail(err);
        const aiChat = res.body.data.createNewAIChat;
        assert.ok(aiChat._id);
      });
  });
});
