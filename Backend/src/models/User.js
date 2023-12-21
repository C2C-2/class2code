module.exports = {
  Username: {
    type: "string",
    unique: true,
  },
  FirstName: "string",
  LastName: "string",
  Email: {
    type: "string",
    unique: true,
  },
  Password: "string",
  Country: "string",
  IsActive: "boolean",
  CreatedBy: "int",
  CreateDate: "string",
  Rate: "int",
  DateOfBirth: "string",
  Gender: "string",
  Work: "string",
  Bio: "string",
  LastTimeOnline: "datetime",
};
