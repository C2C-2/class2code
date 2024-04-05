/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const assert = require("assert");
const request = require("supertest");
const { describe } = require("mocha");
const { app } = require("../../index");

let teamId = 0;
let companyId = 0;
let userId = 2;

describe("Create Company API Tests", () => {
  it("Should create a new company with valid input data", (done) => {
    const company = {
      CompanyName: "Test Company",
      CompanyDescription: "Test company description",
      Domain: "a",
      Rate: 4.5,
    };
    const mutation = `
        mutation {
          createNewCompany(company: $company , userId: ${userId}) {
            CompanyName
            CompanyDescription
            Domain
            Rate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { company } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        companyId = data?.createNewCompany?._id;
        assert.strictEqual(
          data?.createNewCompany?.CompanyName,
          company?.CompanyName
        );
        assert.strictEqual(
          data?.createNewCompany?.CompanyDescription,
          company?.CompanyDescription
        );
        assert.strictEqual(data?.createNewCompany?.Domain, company?.Domain);
        assert.strictEqual(data?.createNewCompany?.Rate, company?.Rate);

        done();
      });
  });
});

describe("Create Team API Tests", () => {
  it("Should create a new team with valid input data", (done) => {
    const team = {
      TeamName: "Test Team",
      IsDeleted: false,
      TeamRole: "Developer",
      CreateDate: "2024-02-26T12:00:00Z",
    };
    const mutation = `
      mutation {
        createNewTeam(team: $team , companyId: ${companyId}) {
          TeamName
          IsDeleted
          TeamRole
          CreateDate
        }
      }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { team } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        console.log(data?.createNewTeam);
        teamId = data?.createNewTeam?._id;
        assert.strictEqual(data?.createNewTeam?.TeamName, team?.TeamName);
        assert.strictEqual(data?.createNewTeam?.IsDeleted, team?.IsDeleted);
        assert.strictEqual(data?.createNewTeam?.TeamRole, team?.TeamRole);
        assert.strictEqual(
          data?.createNewTeam?.CreateDate,
          "2024-02-26T12:00:00Z"
        );
        done();
      });
  });
});
